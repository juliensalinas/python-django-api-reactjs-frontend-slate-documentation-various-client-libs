/* @flow */


import React from 'react';

import {
  getUrl,
} from '../modules';

/**
 * A `LinkButton` wrapper to add {@link WEBSITE_URL} as base URL
 *
 * @example
 * <LinkButton to="/login" />
 */

export class LinkButton extends React.Component {
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
      <ReactLinkButton
        {...props}
        to={to}
      />
    );
  }
}
