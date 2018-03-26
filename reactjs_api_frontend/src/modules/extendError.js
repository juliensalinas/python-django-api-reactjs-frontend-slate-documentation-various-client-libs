/* @flow */

/**
 * This method creates {@link Error} subclass.
 *
 * @param  {!string} className - The class name to create
 * @param  {?string} code      - The code
 * @return {Class.<Error>}     - A new error class
 * @private
 */
export function extendError(className: string, code ?: string): Class<Error> {
  // $FlowFixMe
  function CustomError(message: string): void {
    this.name = className;
    this.message = message;
    // $FlowFixMe
    this.code = code;
    this.stack = new Error().stack;
  }
  CustomError.prototype = Object.create(Error.prototype);
  CustomError.prototype.constructor = CustomError;
  return CustomError;
}
