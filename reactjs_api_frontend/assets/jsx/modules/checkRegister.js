/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {getAjv} from './getAjv';

const REGISTER_SCHEMA = {
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
  },
  required: ['email', 'password'],
};

/**
 * For the given `email` and `password`, the validity is checked with the above schema,
 *
 * If any error, return an array of errors, otherwise return null.
 *
 * @param  {!string} email
 * @param  {!string} password
 * @return {?Array.<Object>}
 */
export function checkRegister(email: string, password: string): ?Array<Object> {
  let validate = getAjv().compile(REGISTER_SCHEMA);
  let result = validate({
    email,
    password,
  });

  if (!result) {
    return validate.errors;
  }

  return null;
}
