/* @flow */

var path = require('path');

var webpack = require('webpack');

module.exports = {
  devtool : 'inline-source-map',
  target  : 'web',
  node    : {
    events: true,
  },
  entry: [
    'ajv',
    'axios',
    'classnames',
    'debug',
    'intl',
    'lodash',
    'querystring',
    'react-dom',
    'react-intl',
    'react',
    'redbox-react',
    'react-router',
    'react-router-dom',
    'moment',
    'validator',
  ],

  output: {
    filename : '[name].bundle.js',
    path     : path.resolve(__dirname, '.dist/'),

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path : '.dist/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name : '[name]_lib',
    }),
  ],
};
