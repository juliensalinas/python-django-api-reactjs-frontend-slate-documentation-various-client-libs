/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  call,
  put,
  take,
} from 'redux-saga/effects';

import auth from '../auth';
import {
  // REQUEST_ERROR,
  RESET_PASSWORD,
  SENDING_REQUEST,
} from '../actions/constants';

/**
 * Use the method `auth.resetPassword` to reset the password.
 *
 * @return {Generator}
 */
export function * resetPasswordFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(RESET_PASSWORD);
    let {email, onSuccess} = request.data;

    yield put({
      sending : true,
      type    : SENDING_REQUEST,
    });

    let success = true;

    try {
      yield call(auth.resetPassword, email);
    } catch (error) {
      success = false;
    } finally {
      yield put({
        sending : false,
        type    : SENDING_REQUEST,
      });
    }
    if (
      success &&
      typeof onSuccess === 'function'
    ) {
      yield call(onSuccess);
    } else {
      yield call(onSuccess);
    }
  }
}
