/* @flow */

let _settings = require('./base');

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  _settings = {
    ..._settings,
    ...require('./development'),
  };
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  _settings = {
    ..._settings,
    ...require('./production'),
  };
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  _settings = {
    ..._settings,
    ...require('./test'),
  };
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'preproduction') {
  _settings = {
    ..._settings,
    ...require('./preproduction'),
  };
}

const settings = _settings;

export default settings;
