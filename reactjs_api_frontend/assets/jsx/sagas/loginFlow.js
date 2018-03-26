/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

/* eslint-disable max-depth */

import {
  call,
  put,
  take,
} from 'redux-saga/effects';

import auth from '../auth';
import {
  LOGIN_REQUEST,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_AUTH,
} from '../actions/constants';
import {
  getCompany,
} from './getCompanyFlow';

/**
 * Use the method `auth.login` to login the user.
 *
 * @return {Generator}
 */
export function * loginFlow(): Generator<*, void, *> {
  while (true) {
    let request = yield take(LOGIN_REQUEST);
    let {
      email,
      onSuccess,
      password,
    } = request.data;

    yield put({
      sending : true,
      type    : SENDING_REQUEST,
    });

    let response;

    let success = true;

    try {
      response = yield call(auth.login, email, password);
    } catch (error) {
      success = false;
      yield put({
        error,
        type: REQUEST_ERROR,
      });
    }

    if (
      response != null &&
      response !== false
    ) {
      let verified = true;
      try {
        yield call(getCompany, 'example.com', response.token);
      } catch (err) {
        verified = false;
        if (err.name === 'NoResultError') {
          verified = true;
        }
      }
      yield put({
        email,
        verified,
        newAuthState : true,
        token        : response.token,
        type         : SET_AUTH,
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
/* eslint-enable max-depth */
