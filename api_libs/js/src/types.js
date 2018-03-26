/* @flow */

import type {
  $AxiosXHRConfigBase,
} from 'axios';

/**
 * @typedef {Object} Options
 * @property {?Object} params
 */
export type Options<T> = $AxiosXHRConfigBase<T>;

/**
 * Token used for API endpoint authentification
 * @typedef {string} Token
 */
export type Token = string;

/**
 * Company details
 * @typedef {Object} Company
 * @property {string}          description
 * @property {string}          email
 * @property {string}          formattedAddress
 * @property {string}          founded
 * @property {Array.<*>}       industries
 * @property {string}          linkedinUrl
 * @property {string}          name
 * @property {string}          phone
 * @property {string}          size
 * @property {Array.<string>}  types
 * @property {string}          websiteUrl
 */
export type Company = {
  description       ?: string,
  email             ?: string,
  formattedAddress  ?: string,
  founded           ?: string,
  industries        ?: Array<any>,
  linkedinUrl       ?: string,
  name              ?: string,
  phone             ?: string,
  size              ?: string,
  types             ?: Array<string>,
  websiteUrl        ?: string,
};

/**
 * Contact details
 * @typedef {Object} Contact
 * @property {string}          company
 * @property {string}          firstName
 * @property {string}          formattedAddress
 * @property {string}          lastName
 * @property {string}          linkedinUrl
 * @property {string}          title
 */
export type Contact = {
  company            ?: string,
  firstName          ?: string,
  formattedAddress   ?: string,
  lastName           ?: string,
  linkedinUrl        ?: string,
  title              ?: string,
};

/**
 * Api options
 * @typedef {Object} ApiOptions
 * @property {?number} timeout
 */

export type ApiOptions = {
  timeout ?: number,
};
