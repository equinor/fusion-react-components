import { create, type Jss, type Plugin } from 'jss';
import functions from 'jss-plugin-rule-value-function';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import propsSort from 'jss-plugin-props-sort';

/**
 * Creates a JSS instance with all necessary plugins configured
 *
 * This function sets up a JSS instance with all required plugins for the styling system:
 * - functions: Enables function values in styles (e.g., props-based styles)
 * - global: Enables global styles
 * - nested: Enables nested selectors (e.g., '&:hover')
 * - camelCase: Converts camelCase to kebab-case
 * - defaultUnit: Adds default units to numeric values
 * - vendorPrefixer: Adds vendor prefixes (only in browser)
 * - propsSort: Sorts CSS properties for consistent output
 *
 * @returns A configured JSS instance ready to use
 */
export function createJssInstance(): Jss {
  return create({
    plugins: [
      functions(), // Enable function values: { color: (props) => props.color }
      global(), // Enable global styles: '@global { ... }'
      nested(), // Enable nested selectors: '&:hover', '& .child'
      camelCase(), // Convert camelCase to kebab-case
      defaultUnit(), // Add default units: { padding: 10 } -> '10px'
      // Vendor prefixer only works in browser (not SSR)
      // Check for window to skip vendor prefixer during SSR
      typeof window === 'undefined' ? null : vendorPrefixer(),
      propsSort(), // Sort CSS properties for consistent output
    ].filter(Boolean) as Plugin[], // Remove null values (vendorPrefixer in SSR)
    // Type assertion is safe because filter removes null values
  });
}

/**
 * Default JSS instance
 *
 * This is the default instance used throughout the application.
 * Individual StylesProviders can override this with their own instance.
 */
export const defaultJss = createJssInstance();
