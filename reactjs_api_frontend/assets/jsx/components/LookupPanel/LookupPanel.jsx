/* @flow */

import React from 'react';
import classNames from 'classnames';
import {
  Panel,
} from 'react';

import styles from './LookupPanel.css';

/**
 * Render a lookup panel.
 *
 * @example
 * <LookupPanel />
 */
export class LookupPanel extends React.Component {
  props: {
    className ?: string,
  };

  static propTypes = {
    className: React.PropTypes.string,
  };

  render(): React.Element<*> {
    let {
      className,
      ...props
    } = this.props;

    className = classNames(styles.lookupPanel, className);

    return (
      <Panel
        className={className}
        headerClassName={styles.header}
        {...props}
      />
    );
  }
}
