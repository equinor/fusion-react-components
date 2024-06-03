/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const named = require('vinyl-named');
const through2 = require('through2');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const jssCli = require('jss-cli');
const { tokens } = require('@equinor/eds-tokens');

const primaryColor = tokens.colors.interactive.primary__resting.hex;
const backgroundColor = tokens.colors.interactive.table__cell__fill_resting.hex;
const headerColor = tokens.colors.interactive.table__header__fill_resting.hex;

// Start of scss/css related tasks
const scssTask = () => {
  return gulp
    .src('./src/agGridStyles/styles.scss')
    .pipe(named())
    .pipe(
      webpackStream({
        mode: 'none',
        module: {
          rules: [
            {
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      syntax: 'postcss-scss',
                      plugins: [
                        autoprefixer({
                          flexbox: true,
                        }),
                      ],
                    },
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    additionalData: `$active-color: ${primaryColor};\n$background-color: ${backgroundColor};\n$header-color: ${headerColor};\n$ag-compatibility-mode: false;\n$ag-suppress-all-theme-deprecation-warnings: true;`,
                  },
                },
              ],
            },
            {
              test: /\.(svg)$/,
              use: [
                'cache-loader',
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    svgo: {
                      cleanupAttrs: true,
                      removeDoctype: true,
                      removeComments: true,
                      removeMetadata: true,
                      removeTitle: true,
                      removeDesc: true,
                      removeEditorsNSData: true,
                      removeUselessStrokeAndFill: true,
                      cleanupIDs: true,
                      collapseGroups: true,
                      convertShapeToPath: true,
                    },
                  },
                },
              ],
            },
          ],
        },
        plugins: [new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin({ filename: '[name].jss.json' })],
      }),
    )
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          // store styleobject as json string
          let styleStr = JSON.stringify(jssCli.cssToJss({ code: file.contents.toString(), dashes: true }), null, 2);

          /* convert 4 backslashes to 2, created by json stringify on the unicode content property */
          styleStr = styleStr.replace(/(")\\{4}([a-f0-9])/g, '$1\\\\$2');

          /* Save to json file as jss object */
          file.contents = Buffer.from(styleStr);
        }

        cb(null, file);
      }),
    )
    .pipe(gulp.dest('./src/agGridStyles/'));
};

// default/release task
gulp.task('scss-to-css', scssTask);
