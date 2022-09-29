/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const named = require('vinyl-named');
const through2 = require('through2');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const test = (string) => {
  return `export const agStyles = ` + 'String.raw`' + string + '`;\n';
};

// Start of scss/css related tasks
const scssTask = () => {
  return gulp
    .src('./styles.scss')
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
                    syntax: 'postcss-scss',
                    plugins: [
                      autoprefixer({
                        flexbox: true,
                      }),
                    ],
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    additionalData:
                      '$ag-compatibility-mode: false;\n$ag-suppress-all-theme-deprecation-warnings: true;',
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
        plugins: [new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin({ filename: '[name].ts' })],
      })
    )
    .pipe(
      through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
          file.contents = Buffer.from(test(file.contents.toString()));
        }

        cb(null, file);
      })
    )
    .pipe(gulp.dest('output/'));
};

// default/release task
gulp.task('scss-to-css', scssTask);
