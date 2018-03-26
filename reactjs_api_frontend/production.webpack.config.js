/* @flow */

var webpackConfig = require('./base.webpack.config');

module.exports = webpackConfig({
  localIdentName : '[hash:15]',
  minimize       : true,
  NODE_ENV       : 'production',
});
