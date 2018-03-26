/* @flow */

import {extendError} from './extendError';

/**
 * Bad parameters
 * @type {BadParametersError}
 */
export const BadParametersError = extendError('BadParametersError', 'Send parameters through GET method');

/**
 * Bad request
 * @type {BadRequestError}
 */
export const BadRequestError = extendError('BadRequestError', 'Request is malformed');

/**
 * Internal server error
 * @type {InternalServerError}
 */
export const InternalServerError = extendError('InternalServerError');

/**
 * Invalid version
 * @type {InvalidVersionError}
 */
export const InvalidVersionError = extendError('InvalidVersionError', 'API version is invalid');

/**
 * Method not allowed
 * @type {MethodNotAllowedError}
 */
export const MethodNotAllowedError = extendError(
  'MethodNotAllowedError',
  'You tried to access an endpoint with an invalid method'
);

/**
 * No result
 * @type {NoResultError}
 */
export const NoResultError = extendError('NoResultError', 'No result matching your request');

/**
 * Not acceptable
 * @type {NotAcceptableError}
 */
export const NotAcceptableError = extendError('NotAcceptableError', 'You requested a format that is not json');

/**
 * Not found
 * @type {NotFoundError}
 */
export const NotFoundError = extendError('NotFoundError', 'Specified endpoint could not be found');

/**
 * Too many requests
 * @type {TooManyRequestsError}
 */
export const TooManyRequestsError = extendError(
  'TooManyRequestsError',
  'You made too many requests on the API in a short period of time'
);

/**
 * Unauthorized
 * @type {UnauthorizedError}
 */
export const UnauthorizedError = extendError('UnauthorizedError', 'API key is wrong');

/**
 * Version required
 * @type {VersionRequiredError}
 */
export const VersionRequiredError = extendError('VersionRequiredError', 'Send API version in the HTTP Accept headers');
