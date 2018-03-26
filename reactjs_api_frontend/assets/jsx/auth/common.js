/* @flow */

import axios, {
  type Axios,
} from 'axios';
import {
  get,
} from 'lodash';

import {
  DEBUG_DELAY,
  ENABLE_DELAY,
  ERRORS_BY_ERROR_CODE,
  HOST,
} from './constants';


/**
 * Return an error instance for the given axios response error.
 *
 * A generic `Error` instance is returned if response error is unknown.
 *
 * @param  {Error} error - The axios error
 * @return {Error}       - The new error instance
 */
export function handleError(error: Error): void {
  let data = get(error, ['response', 'data']);

  throw errorForResponse(data.error_code, data.error_details);
}

/**
 * Convert javascript object to FormData instance.
 *
 * @param  {?Object} data - The object to convert
 * @return {?Object}      - The {@link FormData} instance or null if
 * providen object was wrong
 */
export function jsonToFormData(data: ?Object): ?Object {
  if (
    data != null &&
    typeof data === 'object'
  ) {
    let newData = new FormData();

    for (let key in data) {
      newData.append(key, data[key]);
    }

    return newData;
  }

  return data;
}

let _axios;

/**
 * Return a configured axios instance.
 *
 * We handle a special case when NODE_ENV equals `test` because we can't handle
 * {@link FormData} when using nock to intercept requests.
 *
 * So, in the test environment, we use JSON format, and in the real environment,
 * we use {@link FormData} because the server requires that.
 *
 * @return {Axios} - The axios instance
 */
export function getAxiosInstance(): Axios {
  if (_axios == null) {
    _axios = axios.create({
      baseURL : HOST,
      timeout : 1000,
    });

    // Workaround so we can do unit tests without FormData and
    // use FormData in real environment
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      /* istanbul ignore next */
      _axios.interceptors.request.use(
        (config: Object): Object => {
          let data = get(config, ['data'], {});

          config.data = jsonToFormData(data);

          return config;
        },
        (err: any): Promise<Error> => {
          // Do something with request error
          return Promise.reject(err);
        }
      );
    }

    /* istanbul ignore next */
    if (ENABLE_DELAY) {
      _axios.interceptors.response.use(
        (response: Object): Promise<Object> => {
          return new Promise((resolve: Function, reject: Function): void => {
            setTimeout(resolve, DEBUG_DELAY, response);
          });
        },
        (error: any): Promise<Error> => {
          return new Promise((resolve: Function, reject: Function): void => {
            setTimeout(reject, DEBUG_DELAY, error);
          });
        }
      );
    }
  }

  return _axios;
}
