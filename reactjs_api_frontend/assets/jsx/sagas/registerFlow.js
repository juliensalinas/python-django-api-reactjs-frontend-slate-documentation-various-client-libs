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
  REGISTER_REQUEST,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
} from '../actions/constants';

/**
 * Use the method `auth.register` to register a new user.
 *
 * @return {Generator}
 */
export function * registerFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(REGISTER_REQUEST);
    let {email, password, onSuccess} = request.data;

    yield put({
      sending : true,
      type    : SENDING_REQUEST,
    });

    let response;
    let success = true;

    try {
      response = yield call(auth.register, email, password);

      yield put({
        email,
        newAuthState : true,
        token        : response.token,
        type         : SET_AUTH,
      });
    } catch (error) {
      success = false;
      yield put({
        error,
        type: REQUEST_ERROR,
      });
    }

    yield put({
      sending : false,
      type    : SENDING_REQUEST,
    });

    if (
      success &&
      typeof onSuccess === 'function'
    ) {
      yield call(onSuccess);
    }
  }
}
