/* @flow */

var webpackConfig = require('./base.server.webpack.config');

module.exports = webpackConfig({
  NODE_ENV: 'production',
});
