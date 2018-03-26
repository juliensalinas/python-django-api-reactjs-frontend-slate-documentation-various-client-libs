/* @flow */

/* eslint-disable quote-props */
/* eslint-disable max-len */

import {
  merge,
} from 'lodash';

import en from './en';

export default merge({}, en, {
  locale       : 'en-US',
  parentLocale : 'en',
});

/* eslint-enable quote-props */
/* eslint-enable max-len */
