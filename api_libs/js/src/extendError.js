/* @flow */

export function extendError(className: string, defaultMesage: ?string): Class<Error> {
  // $FlowFixMe
  function CustomError(message: string = defaultMesage): void {
    this.name = className;
    this.message = message;
    this.stack = new Error().stack;
  }
  CustomError.prototype = Object.create(Error.prototype);
  CustomError.prototype.constructor = CustomError;
  return CustomError;
}
