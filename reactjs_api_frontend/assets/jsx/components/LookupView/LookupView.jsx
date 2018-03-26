/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';

import styles from './LookupView.css';
import {LookupForm} from '../LookupForm';

/**
 * Render a lookup view.
 *
 * @example
 * <LookupView onSubmit={handleSubmit} />
 */
export class LookupView extends React.Component {
  props: {
    children ?: any,
    onSubmit  : Function,
  };

  static propTypes = {
    children : React.PropTypes.any,
    onSubmit : React.PropTypes.func.isRequired,
  };

  render(): React.Element<*> {
    let {
      children,
      onSubmit,
      ...props
    } = this.props;

    return (
      <div className={styles.lookupView}>
        <div className={styles.form}>
          <LookupForm
            onSubmit={onSubmit}
            {...props}
          />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}
