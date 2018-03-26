/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {getAjv} from './getAjv';

const CHANGE_PASSWORD_SCHEMA = {
  title      : 'Register',
  type       : 'object',
  properties : {
    email: {
      format : 'email',
      type   : 'string',
    },
    password: {
      minLength         : 8,
      notCommonPassword : true,
      notOnlyNumeric    : true,
      type              : 'string',
      not               : {
        constant: {
          $data: '1/email',
        },
      },
    },
    confirmPassword: {
      constant: {
        $data: '1/password',
      },
    },
  },
  required: ['password', 'confirmPassword'],
};

/**
 * For the given `password` and `confirmPassword`, the validity is checked with the above schema,
 *
 * If any error, return an array of errors, otherwise return null.
 *
 * @param  {!string} password
 * @param  {!string} confirmPassword
 * @return {?Array<Object>}
 */
export function checkNewPassword(
  password: string,
  confirmPassword: string
): ?Array<Object> {
  let validate = getAjv().compile(CHANGE_PASSWORD_SCHEMA);
  let result = validate({
    password,
    confirmPassword,
  });

  if (!result) {
    return validate.errors;
  }

  return null;
}
