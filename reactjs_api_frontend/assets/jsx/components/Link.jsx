/* @flow */

import React from 'react';

import {
  getUrl,
} from '../modules';

/**
 * A `Link` wrapper to add {@link WEBSITE_URL} as base URL
 *
 * @example
 * <Link to="/login" />
 */

export class Link extends React.Component {
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
      <ReactLink
        {...props}
        to={to}
      />
    );
  }
}
