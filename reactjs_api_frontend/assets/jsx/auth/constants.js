/* @flow */

import {
  IncorrectEmailFormatError,
  IncorrectPasswordFormatError,
  NoEmailSuppliedError,
  NoPasswordConfirmationSupploadError,
  NoPasswordSuppliedError,
  NoSecretSuppliedError,
  NoUserFoundError,
  PasswordAndPasswordConfirmationNotEqualError,
  PrivateLinkExpiredError,
  ProblemDuringTokenCreationError,
  ProblemDuringUserRightsCreationError,
  UserAlreadyExistsError,
  WrongHTTPMethodError,
} from './errors';

export const HOST                             = '';
export const URL_LOGIN                        = '/api-token-auth/';
export const URL_REGISTER                     = '/register';
export const URL_RESET_PASSWORD               = '/ask-password-reset';
export const URL_CHECK_CHANGE_PASSWORD_SECRET = '/pwd';
export const URL_CHANGE_PASSWORD_WITH_SECRET  = '/process-new-password';

export const DEBUG_DELAY = 10000;
export const ENABLE_DELAY = false;

export const ERRORS_BY_ERROR_CODE = {
  '1'  : NoEmailSuppliedError,
  '2'  : NoPasswordSuppliedError,
  '3'  : IncorrectEmailFormatError,
  '4'  : IncorrectPasswordFormatError,
  '5'  : UserAlreadyExistsError,
  '6'  : ProblemDuringTokenCreationError,
  '7'  : ProblemDuringUserRightsCreationError,
  '8'  : WrongHTTPMethodError,
  '9'  : PrivateLinkExpiredError,
  '10' : NoUserFoundError,
  '11' : NoSecretSuppliedError,
  '12' : NoPasswordConfirmationSupploadError,
  '13' : PasswordAndPasswordConfirmationNotEqualError,
};
