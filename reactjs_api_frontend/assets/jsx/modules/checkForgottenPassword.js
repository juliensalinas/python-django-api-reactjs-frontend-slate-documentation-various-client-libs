/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {getAjv} from './getAjv';

const FORGOTTEN_PASSWORD_SCHEMA = {
  title      : 'Login',
  type       : 'object',
  properties : {
    email: {
      format : 'email',
      type   : 'string',
    },
  },
  required: ['email'],
};

/**
 * For the given `email`, the validity is checked with the above schema,
 *
 * If any error, return an array of errors, otherwise return null.
 *
 * @param  {!string} email
 * @return {?Array.<Object>}
 */
export function checkForgottenPassword(email: string): ?Array<Object> {
  let validate = getAjv().compile(FORGOTTEN_PASSWORD_SCHEMA);
  let result = validate({
    email,
  });

  if (!result) {
    return validate.errors;
  }

  return null;
}
