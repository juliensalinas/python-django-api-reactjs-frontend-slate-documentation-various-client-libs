/* @flow */

import {extendError} from '../../../src/modules';

/**
 * Invalid domain
 * @type {InvalidDomainError}
 */
export const InvalidDomainError = extendError('InvalidDomainError', '1001');

/**
 * Invalid email
 * @type {InvalidEmailError}
 */
export const InvalidEmailError = extendError('InvalidEmailError', '1002');
