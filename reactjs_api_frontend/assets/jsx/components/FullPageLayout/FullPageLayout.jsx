/* @flow */

import React from 'react';
import classNames from 'classnames';

import styles from './FullPageLayout.css';
import {
  Sidebar,
} from '../Sidebar';
import {
  myappIcon,
} from '../icons';

/**
 * Layout used by all logged in pages.
 *
 * @example
 * <FullPageLayout>
 *   Content here
 * </FullPageLayout>
 */
export class FullPageLayout extends React.Component {
  props: {
    children ?: any,
  };

  state: {
    open: boolean,
  };

  static propTypes = {
    children: React.PropTypes.any,
  };

  constructor(props: any): void {
    super(props);

    this.state = {
      open: false,
    };
  }

  /**
   * Handle menu handle click
   * @param {Event} evt
   * @private
   * @return {void}
   */
  handleMenuHandlerClick = (evt: SyntheticUIEvent): void => {
    evt.preventDefault();

    /* eslint-disable react/no-set-state */
    this.setState({
      open: !this.state.open,
    });
    /* eslint-enable react/no-set-state */
  };

  render(): React.Element<*> {
    let footer;

    let aside = (
      <Sidebar />
    );

    let contentClassName = classNames(styles.container, {
      [styles.menuIsOpen]: this.state.open,
    });

    let asideClassName = classNames(styles.aside, {
      [styles.menuIsOpen]: this.state.open,
    });

    return (
      <ReactFullPageLayout
        aside={aside}
        asideClassName={asideClassName}
        contentClassName={contentClassName}
        footer={footer}
      >
        <div className={styles.mobileNav}>
          <Link
            className={styles.menuHandlerLink}
            onClick={this.handleMenuHandlerClick}
          >
            <ThMenuIcon className={styles.menuHandler} />
          </Link>
          <myappIcon className={styles.logo} />
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </ReactFullPageLayout>
    );
  }
}
