/* @flow */

import {Api} from '../src';

/* eslint-disable no-console */

var client = new Api('your_token');

client.getCompany('example.com')
  .then((company: Object): void => {
    console.log(company);
  })
  .catch((err: Error): void => {
    console.error(err);
  });

/* eslint-enable no-console */
