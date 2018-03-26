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
  InvalidEmailError,
} from '../modules/errors';
import {
  ADD_CONTACT,
  GET_CONTACT,
  SET_CONTACT,
} from '../actions/constants';
import {
  TIMEOUT,
} from '../../../src/constants';

export function getContact(domain: string, token: string): Promise<Object> {
  let client = new myapp(token, {
    timeout: TIMEOUT,
  });

  return client.getContact(domain);
}

/**
 * Use the My App API to retrieve contact details.
 *
 * @return {Generator}
 */
export function * getContactFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(GET_CONTACT);
    let {email} = request.data;
    const state = yield select();

    let contactId = yield call(uniqueId);

    yield put({
      email,
      id   : contactId,
      type : ADD_CONTACT,
    });

    let result;
    let error;

    try {
      if (!validator.isEmail(email)) {
        throw new InvalidEmailError('Invalid email');
      }
      result = yield call(getContact, email, state.auth.token);
    } catch (err) {
      error = err;
    }

    yield put({
      id      : contactId,
      data    : result,
      fetched : true,
      error,
      type    : SET_CONTACT,
    });
  }
}
