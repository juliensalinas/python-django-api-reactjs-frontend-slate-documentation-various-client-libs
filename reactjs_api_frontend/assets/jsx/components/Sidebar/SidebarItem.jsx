/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  Span,
} from 'react';

import styles from './Sidebar.css';
import {
  NavLink,
} from '../NavLink';

/**
 * Represent a sidebar item.
 *
 * @example
 * <SidebarItem content="A link" />
 * @example
 * <SidebarItem content={{id: 'A localised link'}} />
 * @example
 * <SidebarItem Icon={AnIcon} to="/login" />
 */
export class SidebarItem extends React.Component {
  props: {
    Icon    ?: any,
    content  : any,
    to      ?: string,
  };

  static propTypes = {
    Icon    : React.PropTypes.any,
    content : React.PropTypes.any.isRequired,
    to      : React.PropTypes.string,
  };

  render(): React.Element<*> {
    let {
      content,
      to,
      Icon,
      ...props
    } = this.props;

    let icon;

    if (Icon != null) {
      icon = (
        <div className={styles.itemIcon}>
          <Icon />
        </div>
      );
    }

    return (
      <NavLink
        activeClassName={styles.itemActive}
        className={styles.item}
        to={to}
        {...props}
      >
        {icon}
        <Span
          className={styles.itemText}
          content={content}
        />
      </NavLink>
    );
  }
}
