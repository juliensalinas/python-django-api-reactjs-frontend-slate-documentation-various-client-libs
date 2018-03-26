/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
  Route,
} from 'react-router-dom';

import {BaseLayout} from '../components/BaseLayout';

/**
 * A {@link https://reacttraining.com/react-router/web/api/Route|react-router Route} wrapper.
 *
 * Use {@link BaseLayout} to render children.
 *
 * @param {Object} params
 * @return {*}
 */
export const PublicRoute = (params: Object): any => {
  let {
    component,
    ...rest
  } = params;

  /* istanbul ignore next */
  function render(props: Object): any {
    let element = React.createElement(component, props);
    return (
      <BaseLayout>
        {element}
      </BaseLayout>
    );
  }

  /* istanbul ignore next */
  return (
    <Route {...rest} render={render} />
  );
};
/* eslint-enable react/no-multi-comp */
