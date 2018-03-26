/* @flow */

import publicSettings from './public';

let _settings = {
  ...publicSettings,
};

/* istanbul ignore next */
if (!inBrowser || process.env.NODE_ENV === 'test') {
  let privateSettings = require('./private').default;
  _settings = {
    ..._settings,
    ...privateSettings,
  };
}

const settings = _settings;

export default settings;
