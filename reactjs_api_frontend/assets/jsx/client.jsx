/* @flow */

import React from 'react';
import {
  pick,
} from 'lodash';
import {
  getClient,
} from 'react';

import routes  from './routes';
import locales from './locales';
import {
  DEFAULT_LOCALE,
  LOCALES,
} from '../../src/constants';

getClient({
  defaultLocale : DEFAULT_LOCALE.split('-')[0],
  hot           : true,
  locales       : pick(locales, LOCALES),
  routes,
  wrapper       : 'wrapper',
})
.then((client: Object): void => {
  client.render();

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept(['./routes', './client'], (): void => {
      client.render();
    });
  }
})
.catch((err: Error): void => {
  /* eslint-disable no-console */
  console.error(err);
  /* eslint-enable no-console */
});
