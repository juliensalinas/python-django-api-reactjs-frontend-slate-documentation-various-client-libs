/* @flow */

import {
  constant,
  get,
} from 'lodash';

import {
  URL_CHANGE_PASSWORD_WITH_SECRET,
  URL_CHECK_CHANGE_PASSWORD_SECRET,
  URL_LOGIN,
  URL_REGISTER,
  URL_RESET_PASSWORD,
} from './constants';
import {
  getAxiosInstance,
  handleError,
} from './common';

const auth = {
  /**
  * Log a user in, returning a promise with the response data when done.
  *
  * @param {string} email    - The email of the user
  * @param {string} password - The password of the user
  * @return {Promise.<boolean>}
  */
  login(email: string, password: string): Promise<Object> {
    return getAxiosInstance().post(URL_LOGIN, {
      username: email,
      password,
    })
    .then((response: Object): boolean => {
      return response.data;
    })
    .catch((err: Error): void => {
      throw err;
    });
  },

  /**
  * Return infos from the localStorage.
  *
  * @return {Object}
  */
  infos(): Object {
    let verified = false;
    let _localStorage = get(window, ['localStorage'], {});
    try {
      verified = JSON.parse(_localStorage.verified);
    } catch (err) {
      //
    }
    return {
      email    : _localStorage.email,
      loggedIn : !!_localStorage.token,
      token    : _localStorage.token,
      verified,
    };
  },

  /**
  * Register a user and then log the user in.
  *
  * @param {string} email    - The email of the user
  * @param {string} password - The password of the user
  * @return {Promise.<boolean>}
  */
  register(email: string, password: string): Promise<Object> {
    return getAxiosInstance().post(URL_REGISTER, {
      username: email,
      password,
    })
    .then((response: Object): Object => {
      return response.data;
    })
    .catch(handleError);
  },

  /**
  * Reset the password for an email.
  *
  * @param {string} email - The email of the user to reset the password
  * @return {Promise.<boolean>}
  */
  resetPassword(email: string): Promise<boolean> {
    return getAxiosInstance().post(URL_RESET_PASSWORD, {
      email,
    })
    .then(constant(true))
    .catch(handleError);
  },

  /**
  * Check secret.
  *
  * @param {string} secret - Check that the given secret is valid
  * @return {Promise.<boolean>}
  */
  checkChangePasswordSecret(
    secret: string
  ): Promise<boolean> {
    return getAxiosInstance().get(`${URL_CHECK_CHANGE_PASSWORD_SECRET}/${secret}`)
    .then((response: Object): boolean => {
      return response.data.secret === secret;
    })
    .catch(handleError);
  },

  /**
  * Change password with secret.
  *
  * @param {string} password        - New password
  * @param {string} confirmPassword - Confirmation of the password
  * @param {string} secret          - The secret
  * @return {Promise.<boolean>}
  */
  changePasswordWithSecret(
    password: string,
    confirmPassword: string,
    secret: string
  ): Promise<boolean> {
    return getAxiosInstance().post(URL_CHANGE_PASSWORD_WITH_SECRET, {
      password,
      password_confirmation: confirmPassword,
      secret,
    })
    .then(constant(true))
    .catch(handleError);
  },
};

export default auth;
