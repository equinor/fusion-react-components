/**
 * Updates the current URL parameters with the provided key-value pairs.
 * If a value is null or undefined, the corresponding parameter is removed.
 *
 * This method allows you to dynamically update the query parameters of the current URL without reloading the page.
 * This can be useful for single-page applications (SPAs) where you want to reflect changes in the URL based on user interactions or application state changes.
 *
 * @param paramsObject - An object containing key-value pairs to update the URL parameters.
 * @returns The new URL with the updated parameters.
 *
 * @example
 * // Current URL: http://example.com/page?bar[foo]=2
 * updateCurrentUrlParams({ foo[bar]: '3', bar[foo]: null });
 * // Returns: http://example.com/page?foo[bar]=3
 *
 * The method uses the `URLSearchParams` API to manipulate the query string of the current URL. It iterates over the provided `paramsObject` and updates the `searchParams` accordingly.
 * Implementation Details:
 *   - `URLSearchParams`: This API provides a convenient way to work with query strings. It allows adding, updating, and deleting parameters easily.
 *   - Iteration: The method iterates over the entries of `paramsObject` using `Object.entries()`. For each entry, it checks if the value is `null` or `undefined` to decide whether to delete or set the parameter.
 *   - Unencoded Query String: The method constructs the query string manually to ensure it is unencoded, which might be necessary for certain use cases.
 *   - URL Construction: A new `URL` object is created based on the current URL, and the updated query string is assigned to its `search` property.
 * Why Not Just...:
 *   - Direct String Manipulation: Directly manipulating the query string as a string can be error-prone and less readable. Using `URLSearchParams` provides a more structured and reliable way to handle query parameters.
 *   - Reloading the Page: Updating the URL without reloading the page is crucial for SPAs to maintain a smooth user experience. This method achieves that by only modifying the URL in the browser's address bar.
 */
export const updateCurrentUrlParams = (
  paramsObject: Record<string, string | null | undefined>,
): string => {
  // Create a URLSearchParams object from the current URL's query string
  const searchParams = new URLSearchParams(window.location.search);

  // Iterate over the key-value pairs in the paramsObject
  for (const [key, value] of Object.entries(paramsObject)) {
    // If the value is null or undefined, remove the parameter from the URL
    if (value === null || value === undefined) {
      searchParams.delete(key);
    } else {
      // Otherwise, set the parameter to the new value
      searchParams.set(key, value);
    }
  }

  // Construct the unencoded query string from the updated searchParams
  const unencodedQuery = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // Construct the new URL with the updated query string
  const newUrl = new URL(window.location.href);
  newUrl.search = unencodedQuery;

  // Return the full new URL
  return newUrl.toString();
};

export default updateCurrentUrlParams;
