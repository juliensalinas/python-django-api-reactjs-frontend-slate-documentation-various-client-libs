/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  uniqueId,
} from 'lodash';
import {
  call,
  put,
  select,
  take,
} from 'redux-saga/effects';
import {myapp} from 'myapp-intl';
import validator from 'validator';

import {
  InvalidDomainError,
} from '../modules/errors';
import {
  ADD_COMPANY,
  GET_COMPANY,
  SET_COMPANY,
} from '../actions/constants';
import {
  TIMEOUT,
} from '../../../src/constants';

export function getCompany(domain: string, token: string): Promise<Object> {
  let client = new myapp(token, {
    timeout: TIMEOUT,
  });

  return client.getCompany(domain);
}

/**
 * Use the My App API to retrieve company details.
 *
 * @return {Generator}
 */
export function * getCompanyFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(GET_COMPANY);
    let {domain} = request.data;
    const state = yield select();

    let domainId = yield call(uniqueId);

    yield put({
      domain,
      id   : domainId,
      type : ADD_COMPANY,
    });

    let result;
    let error;

    try {
      if (!validator.isFQDN(domain)) {
        throw new InvalidDomainError('Invalid domain');
      }
      result = yield call(getCompany, domain, state.auth.token);
    } catch (err) {
      error = err;
    }

    yield put({
      id      : domainId,
      data    : result,
      fetched : true,
      error,
      type    : SET_COMPANY,
    });
  }
}
