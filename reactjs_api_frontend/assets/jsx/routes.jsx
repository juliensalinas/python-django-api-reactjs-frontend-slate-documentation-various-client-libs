/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Provider} from 'react-redux';
import {
  GoogleAnalytics,
} from 'react';

import {
  Content,
  Wrapper,
} from './components';
import {
  Account,
  ApiKey,
  ChangePasswordWithSecret,
  CompanyLookup,
  ContactLookup,
  Dashboard,
  ForgottenPassword,
  GetStarted,
  Login,
  Logout,
  NoMatch,
  Register,
  Support,
} from './pages';
import {
  getStore,
  PrivateRoute,
  PublicRoute,
} from './modules';
import {
  WEBSITE_URL,
} from '../../src/constants';
import settings from './settings';

let {
  GOOGLE_ANALYTICS_KEY,
} = settings;

const SubRoutes = ({match}: Object): React.Element<*> => {
  return (
    <Switch>
      <PublicRoute component={Login} path={`${match.url}/login`} exact />
      <PublicRoute component={Register} path={`${match.url}/register`} exact />
      <PublicRoute component={ForgottenPassword} path={`${match.url}/forgot`} exact />
      <PublicRoute component={ChangePasswordWithSecret} path={`${match.url}/pwd/:secret`} exact />
      <PrivateRoute component={Dashboard} path={`${match.url}`} exact />
      <PrivateRoute component={Logout} path={`${match.url}/logout`} exact />
      <PrivateRoute component={Account} path={`${match.url}/account`} exact />
      <PrivateRoute component={ApiKey} path={`${match.url}/key`} exact />
      <PrivateRoute component={ContactLookup} path={`${match.url}/contact`} exact />
      <PrivateRoute component={CompanyLookup} path={`${match.url}/company`} exact />
      <PrivateRoute component={GetStarted} path={`${match.url}/get-started`} exact />
      <PrivateRoute component={Support} path={`${match.url}/support`} exact />
      <PublicRoute component={NoMatch} />
    </Switch>
  );
};

let children = (
  <Wrapper dispatch={getStore().dispatch}>
    <Content>
      <Switch>
        <Route component={SubRoutes} path={WEBSITE_URL} />
        <Redirect from="/" to={WEBSITE_URL} />
        <PublicRoute component={NoMatch} />
      </Switch>
    </Content>
  </Wrapper>
);

// If we have a Google Analytics key, add `GoogleAnalytics` wrapper
if (GOOGLE_ANALYTICS_KEY != null) {
  const GoogleAnalyticsWithRouter = withRouter(GoogleAnalytics);

  children = (
    <GoogleAnalyticsWithRouter gaKey={GOOGLE_ANALYTICS_KEY}>
      {children}
    </GoogleAnalyticsWithRouter>
  );
}

export default (
  <Provider store={getStore()}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);
