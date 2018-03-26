/* @flow */

import React from 'react';

import styles from './BaseLayout.css';
import {myappIcon} from '../icons';

/**
 * Layout used by not logged in pages.
 *
 * @example
 * <BaseLayout>
 *   Content here
 * </BaseLayout>
 */
export class BaseLayout extends React.Component {
  props: {
    children ?: any,
  };

  static propTypes = {
    children: React.PropTypes.any,
  };

  render(): React.Element<*> {
    let {
      children,
    } = this.props;

    return (
      <div className={styles.content}>
        <h1 className={styles.title}>
          <myappIcon className={styles.logo} />
        </h1>
        <div className={styles.panel}>
          {children}
        </div>
      </div>
    );
  }
}
