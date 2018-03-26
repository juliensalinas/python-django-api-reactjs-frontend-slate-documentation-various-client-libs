/* @flow */

/**
 * Return a content object compatible with `react-intl` for the given `errorCode`.
 *
 * If the `errorCode` is null, return a generic error.
 *
 * @param  {?string} errorCode - The error code
 * @return {Object}            - An object compatible with react-intl
 * @private
 */
export function getErrorContent(errorCode ?: ?string): Object {
  if (errorCode == null) {
    return {
      id: 'global.error',
    };
  }

  return {
    id: `global.error.${errorCode}`,
  };
}
