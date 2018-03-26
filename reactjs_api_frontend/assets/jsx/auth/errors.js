/* @flow */

/* eslint-disable max-len */
import {extendError} from '../../../src/modules';

/**
 * No email supplied
 * @type {NoEmailSuppliedError}
 */
export const NoEmailSuppliedError = extendError('NoEmailSuppliedError', '1');

/**
 * No password supplied
 * @type {NoPasswordSuppliedError}
 */
export const NoPasswordSuppliedError = extendError('NoPasswordSuppliedError', '2');

/**
 * Incorrect email format
 * @type {IncorrectEmailFormatError}
 */
export const IncorrectEmailFormatError = extendError('IncorrectEmailFormatError', '3');

/**
 * Incorrect password format
 * @type {IncorrectPasswordFormatError}
 */
export const IncorrectPasswordFormatError = extendError('IncorrectPasswordFormatError', '4');

/**
 * User already exists
 * @type {UserAlreadyExistsError}
 */
export const UserAlreadyExistsError = extendError('UserAlreadyExistsError', '5');

/**
 * Problem during token creation
 * @type {ProblemDuringTokenCreationError}
 */
export const ProblemDuringTokenCreationError = extendError('ProblemDuringTokenCreationError', '6');

/**
 * Problem during user rights creation
 * @type {ProblemDuringUserRightsCreationError}
 */
export const ProblemDuringUserRightsCreationError = extendError('ProblemDuringUserRightsCreationError', '7');

/**
 * Wrong HTTP method
 * @type {WrongHTTPMethodError}
 */
export const WrongHTTPMethodError = extendError('WrongHTTPMethodError', '8');

/**
 * Private link expired
 * @type {PrivateLinkExpiredError}
 */
export const PrivateLinkExpiredError = extendError('PrivateLinkExpiredError', '9');

/**
 * No user found
 * @type {NoUserFoundError}
 */
export const NoUserFoundError = extendError('NoUserFoundError', '10');

/**
 * No secret supplied
 * @type {NoSecretSuppliedError}
 */
export const NoSecretSuppliedError = extendError('NoSecretSuppliedError', '11');

/**
 * No password confirmation suppload
 * @type {NoPasswordConfirmationSupploadError}
 */
export const NoPasswordConfirmationSupploadError = extendError('NoPasswordConfirmationSupploadError', '12');

/**
 * Password and password confirmation not equal
 * @type {PasswordAndPasswordConfirmationNotEqualError}
 */
export const PasswordAndPasswordConfirmationNotEqualError = extendError('PasswordAndPasswordConfirmationNotEqualError', '13');
/* eslint-enable max-len */
