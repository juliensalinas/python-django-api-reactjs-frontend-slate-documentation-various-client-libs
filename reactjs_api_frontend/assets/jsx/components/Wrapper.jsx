/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';

import {clearError} from '../actions';

/**
 * A wrapper used to clear error when changing URL.
 *
 * @example
 * <Wrapper />
 */

export class Wrapper extends React.Component {
  props: {
    children ?: any,
    dispatch  : Function,
  };

  static propTypes = {
    children : React.PropTypes.any,
    dispatch : React.PropTypes.func.isRequired,
  };

  componentWillReceiveProps(): void {
    this.props.dispatch(
      clearError()
    );
  }

  render(): ?React.Element<*> {
    let {
      children,
    } = this.props;

    if (children == null) {
      return null;
    }

    return children;
  }
}
