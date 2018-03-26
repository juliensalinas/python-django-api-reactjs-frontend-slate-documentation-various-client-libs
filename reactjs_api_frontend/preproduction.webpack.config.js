/* @flow */

var webpackConfig = require('./base.webpack.config');

module.exports = webpackConfig({
  localIdentName : '[name]-[local]-[hash:5]',
  minimize       : false,
  NODE_ENV       : 'preproduction',
});
