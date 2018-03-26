/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {
  omit,
} from 'lodash';

import {getStore} from './store';
import {FullPageLayout} from '../components/FullPageLayout';
import {
  WEBSITE_URL,
} from '../../../src/constants';

/**
 * A {@link https://reacttraining.com/react-router/web/api/Route|react-router Route} wrapper.
 *
 * Check that the user is logged in, if not, redirect to login page.
 *
 * Use {@link FullPageLayout} to render children.
 *
 * @param {Object} params
 * @return {*}
 */
export const PrivateRoute = (params: Object): any => {
  let {
    component,
    ...rest
  } = params;

  rest = omit(rest, ['children']);

  let {auth} = getStore().getState();

  /* istanbul ignore next */
  function render(props: Object): any {
    if (auth.loggedIn) {
      let element = React.createElement(component, props);
      return (
        <FullPageLayout>
          {element}
        </FullPageLayout>
      );
    }

    let to = {
      pathname : `${WEBSITE_URL}/login`,
      state    : {
        from: props.location,
      },
    };

    return (
      <Redirect to={to} />
    );
  }

  /* istanbul ignore next */
  return (
    <Route {...rest} render={render} />
  );
};
/* eslint-enable react/no-multi-comp */
