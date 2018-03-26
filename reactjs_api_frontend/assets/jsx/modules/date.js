/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  toString,
} from 'lodash';

import {
  MOMENT_FORMAT,
} from '../../../src/constants';

/**
 * Format the `date` to a localized version by using {@link MOMENT_FORMAT}
 *
 * @param  {!Date} date
 * @param  {?moment} moment
 * @return {?string}
 */
export function formatDate(date: Date, moment: ?Function): ?string {
  if (date == null) {
    return null;
  }

  if (moment == null) {
    return toString(date);
  }

  return moment(date).format(MOMENT_FORMAT);
}
