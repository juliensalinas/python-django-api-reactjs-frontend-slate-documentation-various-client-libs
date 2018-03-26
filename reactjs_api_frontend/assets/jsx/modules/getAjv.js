/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import Ajv from 'ajv';
import {
  constant,
} from 'lodash';

import {COMMON_PASSWORDS} from './commonPasswords';

let _ajv;

export function notCommonPasswordCompile(value: boolean): Function {
  if (value === false) {
    return constant(true);
  }

  return (data: string): boolean => {
    return COMMON_PASSWORDS.indexOf(data) === -1;
  };
}

export function notOnlyNumericCompile(value: boolean): Function {
  if (value === false) {
    return constant(true);
  }

  const regexp = /^\d+$/;
  return (data: string): boolean => {
    return data.match(regexp) == null;
  };
}

/**
 * Return an {@link https://github.com/epoberezkin/ajv|Ajv} instance
 * with custom keywords configured:
 * - notCommonPassword
 * - notOnlyNumeric
 *
 * @return {Ajv}
 */
export function getAjv(): Ajv {
  if (_ajv == null) {
    _ajv = new Ajv({
      allErrors : true,
      messages  : false,
      v5        : true,
    });

    _ajv.addKeyword('notCommonPassword', {
      compile : notCommonPasswordCompile,
      type    : 'string',
    });

    _ajv.addKeyword('notOnlyNumeric', {
      compile : notOnlyNumericCompile,
      type    : 'string',
    });
  }

  return _ajv;
}
