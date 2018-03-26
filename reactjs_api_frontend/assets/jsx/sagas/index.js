/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  fork,
} from 'redux-saga/effects';

import {changePasswordWithSecretFlow} from './changePasswordWithSecretFlow';
import {getCompanyFlow}               from './getCompanyFlow';
import {getContactFlow}               from './getContactFlow';
import {loginFlow}                    from './loginFlow';
import {registerFlow}                 from './registerFlow';
import {resetPasswordFlow}            from './resetPasswordFlow';

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * root(): Generator<*, void, *> {
  yield [
    fork(loginFlow),
    fork(registerFlow),
    fork(getCompanyFlow),
    fork(getContactFlow),
    fork(resetPasswordFlow),
    fork(changePasswordWithSecretFlow),
  ];
}
