/* @flow */

import {
  camelCase,
  inRange,
  mapKeys,
  toString,
} from 'lodash';

import {
  BadParametersError,
  BadRequestError,
  InternalServerError,
  InvalidVersionError,
  MethodNotAllowedError,
  NoResultError,
  NotAcceptableError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  VersionRequiredError,
} from './errors';

const ERRORS_BY_STATUS = {
  '400' : BadRequestError,
  '401' : UnauthorizedError,
  '404' : NotFoundError,
  '405' : MethodNotAllowedError,
  '406' : NotAcceptableError,
  '429' : TooManyRequestsError,
};

const ERRORS_BY_ERROR_CODE = {
  '1' : VersionRequiredError,
  '2' : NoResultError,
  '3' : BadParametersError,
  '4' : InvalidVersionError,
};

export function camelCaseEveryProps(obj: Object): Object {
  return mapKeys(obj, (value: string, key: string): string => {
    return camelCase(key);
  });
}

export function errorForResponse(
  status: number,
  errorCode: string,
  detail: string
): Error {
  let MyAppError;

  if (errorCode != null) {
    MyAppError = ERRORS_BY_ERROR_CODE[errorCode];
  }

  if (
    MyAppError == null &&
    status != null
  ) {
    MyAppError = ERRORS_BY_STATUS[toString(status)];
  }

  if (
    MyAppError == null &&
    inRange(status, 500, 600)
  ) {
    MyAppError = InternalServerError;
  }

  if (MyAppError == null) {
    MyAppError = Error;
  }

  return new MyAppError(detail);
}
