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
  CHANGE_PASSWORD_WITH_SECRET,
  REQUEST_ERROR,
  SENDING_REQUEST,
} from '../actions/constants';

/**
 * Use the method `auth.changePasswordWithSecret` to change the password
 * of the user.
 *
 * @return {Generator}
 */
export function * changePasswordWithSecretFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(CHANGE_PASSWORD_WITH_SECRET);
    let {
      confirmPassword,
      onSuccess,
      password,
      secret,
    } = request.data;

    yield put({
      sending : true,
      type    : SENDING_REQUEST,
    });

    let success = true;

    try {
      yield call(auth.changePasswordWithSecret, password, confirmPassword, secret);
    } catch (error) {
      success = false;
      yield put({
        error,
        type: REQUEST_ERROR,
      });
    } finally {
      yield put({
        type    : SENDING_REQUEST,
        sending : false,
      });
    }

    if (
      success &&
      typeof onSuccess === 'function'
    ) {
      yield call(onSuccess);
    }
  }
}
