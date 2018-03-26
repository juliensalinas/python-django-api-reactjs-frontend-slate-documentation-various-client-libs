/* @flow */

import axios, {
  type Axios,
  type $AxiosXHR,
} from 'axios';

import {
  get,
  merge,
} from 'lodash';

import {
  camelCaseEveryProps,
  errorForResponse,
} from './utils';

import type {
  Company,
  Contact,
  ApiOptions,
  Options,
  Token,
} from './types';

import {
  ACCEPT,
  PATHNAME_COMPANY,
  PATHNAME_CONTACT,
  URL,
  VERSION,
  TIMEOUT,
} from './constants';

const OPTIONS = {
  timeout: TIMEOUT,
};

/**
 * Api client
 */
export class Api {
  /**
   * @private
   * @type {Axios}
   */
  __client: Axios;

  /**
   * Constructor
   *
   * @param {Token} token - Token used for authentification
   * @param {ApiOptions} opts - Options
   * @public
   * @return {void}
   */
  constructor(token: Token, opts: ApiOptions = {}): void {
    opts = merge({}, OPTIONS, opts);

    this.__client = axios.create({
      ...opts,
      baseURL : URL,
      headers : {
        Authorization : `Token ${token}`,
        Accept        : `${ACCEPT}; version = ${VERSION}`,
      },
    });
  }

  /**
   * Request to the API endpoint
   *
   * @private
   * @param {string} url
   * @param {Options} options
   * @return {Promise.<$AxiosXHR>}
   */
  __get(url: string, options: Options<*>): Promise<$AxiosXHR<*>> {
    return this.__client.get(url, options)
      .then(this.__onSuccess, this.__onError);
  }

  /**
   * Called on successfull request
   *
   * @private
   * @param {Object} response
   * @return {Promise.<Object>}
   */
  __onSuccess(response: Object): Promise<Object> {
    return camelCaseEveryProps(response.data);
  }

  /**
   * Called on error
   *
   * @private
   * @param {Error} err
   * @return {Promise.<Error>}
   */
  __onError(err: Error): Promise<Error> {
    let response = get(err, ['response']);

    // It's not a valid Axios error, reject with the provided error
    /* istanbul ignore next */
    if (response == null) {
      return Promise.reject(err);
    }

    let errorCode = get(response, ['data', 'error_code']);
    let detail    = get(response, ['data', 'detail']);

    // Try to get a specific error for the response
    let error = errorForResponse(response.status, errorCode, detail);

    return Promise.reject(error);
  }

  /**
   * Retrieve company details with a `domain`
   *
   * @public
   * @param {string} domain
   * @return {Promise.<Company>}
   */
  getCompany(domain: string): Promise<Company> {
    return this.__get(PATHNAME_COMPANY, {
      params: {
        domain,
      },
    });
  }

  /**
   * Retrieve contact details with an `email`
   *
   * @public
   * @param {string} email
   * @return {Promise.<Contact>}
   */
  getContact(email: string): Promise<Contact> {
    return this.__get(PATHNAME_CONTACT, {
      params: {
        email,
      },
    });
  }
}
