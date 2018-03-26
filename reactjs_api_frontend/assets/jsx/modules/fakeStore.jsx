/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {Provider} from 'react-redux';
import {
  createStore,
} from 'redux';

export function reducer(state: Object = {}): Object {
  return state;
}

export function getFakeStore(): Object {
  return createStore(reducer);
}

/**
 * Used to simulate a fake redux store in unit tests
 */
export class WithFakeStore extends React.Component {
  props: {
    children ?: any,
    store     : Object,
  }

  static propTypes = {
    children : React.PropTypes.any,
    store    : React.PropTypes.object,
  };

  render(): React.Element<*> {
    let {
      children,
      store,
    } = this.props;

    return (
      <Provider store={getFakeStore(store)}>
        {children}
      </Provider>
    );
  }
}
