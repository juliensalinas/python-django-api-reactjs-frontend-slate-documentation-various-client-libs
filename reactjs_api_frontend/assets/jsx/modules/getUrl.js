/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  WEBSITE_URL,
} from '../../../src/constants';

export function getPathname(pathname: ?string): ?string {
  if (pathname == null) {
    return null;
  }

  if (pathname === '/') {
    return WEBSITE_URL;
  }

  if (typeof pathname === 'string') {
    return `${WEBSITE_URL}${pathname}`;
  }

  return pathname;
}

/**
 * A `NavLink` wrapper to add {@link WEBSITE_URL} as base URL
 *
 * @param {*} to - New location as string or as location
 * @return {string}
 */
export function getUrl(to: any): any {
  if (to == null) {
    return null;
  }

  if (typeof to === 'string') {
    return getPathname(to);
  } else if (
    to != null &&
    to.pathname != null
  ) {
    to = {
      ...to,
      pathname: getPathname(to.pathname),
    };
  }

  return to;
}
