/* @flow */

/**
 * This locale will be used for unknown and not registered locale.
 *
 * @constant
 * @type {string}
 * @default
 */
export const DEFAULT_LOCALE = 'fr';

/**
 * Registered locales.
 *
 * A javascript file for each registered locale must exist in `assets/jsx/locales`.
 *
 * @constant
 * @type {string}
 * @default
 */
export const LOCALES = [
  'en-US',
  'en',
  'fr-FR',
  'fr',
];

/**
 * The website title
 *
 * @constant
 * @type {string}
 * @default
 */
export const WEBSITE_TITLE = 'My App';

/**
 * The website base URL
 *
 * @constant
 * @type {string}
 * @default
 */
export const WEBSITE_URL = '/client';

/**
 * Timeout used for API and auth requests
 *
 * @constant
 * @type {string}
 * @default
 */
export const TIMEOUT = 5000;

/**
 * This format is used for displaying date like in `lastUpdated` field
 *
 * Look at other alternative formats: {@link http://momentjs.com/docs/#/displaying/format/|Moment format}
 *
 * @constant
 * @type {string}
 * @see {@link http://momentjs.com/docs/#/displaying/format/|Moment format}
 * @default
 */
export const MOMENT_FORMAT = 'LL';

/**
 * Folder used in index.html for assets
 *
 * @constant
 * @type {string}
 * @default
 */
export const PRODUCTION_ASSETS_PATH = '/static/react_api_connection';
