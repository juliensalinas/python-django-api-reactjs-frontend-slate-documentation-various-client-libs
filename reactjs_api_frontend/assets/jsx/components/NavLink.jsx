/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  NavLink as reactNavLink,
} from 'react';

import {
  getUrl,
} from '../modules';

/**
 * A `NavLink` wrapper to add {@link WEBSITE_URL} as base URL
 *
 * @example
 * <NavLink to="/login" />
 */

export class NavLink extends React.Component {
  props: {
    to: any,
  };

  static propTypes = {
    to: React.PropTypes.any,
  };

  render(): React.Element<*> {
    let {
      to,
      ...props
    } = this.props;

    to = getUrl(to);

    return (
      <reactNavLink
        {...props}
        to={to}
      />
    );
  }
}
