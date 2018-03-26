/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {getAjv} from './getAjv';

const LOGIN_SCHEMA = {
  title      : 'Login',
  type       : 'object',
  properties : {
    email: {
      format : 'email',
      type   : 'string',
    },
    password: {
      minLength : 1,
      type      : 'string',
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
export function checkLogin(email: string, password: string): ?Array<Object> {
  let validate = getAjv().compile(LOGIN_SCHEMA);
  let result = validate({
    email,
    password,
  });

  if (!result) {
    return validate.errors;
  }

  return null;
}
