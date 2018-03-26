/* @flow */

/* eslint-disable key-spacing */

import path from 'path';

var webpackConfig = require('./base.webpack.config');

module.exports = webpackConfig({
  localIdentName : '[name]-[local]-[hash:5]',
  minimize       : false,
  NODE_ENV       : 'development',
  cache          : true,
  devtool        : 'inline-source-map',
  entry          : [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3001',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    './assets/jsx/client.jsx',
  ],
  devServer: {
    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: path.resolve(__dirname, '.dist'),

    publicPath: '/',

    host: '0.0.0.0',
    port: 3001,
    https: false,
    proxy: {
      '**': {
        target: 'http://127.0.0.1:3000',
        secure: false,
      },
    },
    // publicPath: '/assets/',
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      hash: true,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      cached: false,
      reasons: false,
      source: false,
      errorDetails: true,
      chunkOrigins: false,
      colors: true,
    },
  },
  output: {
    // the output bundle
    filename: 'bundle.js',

    path: path.resolve(__dirname, '.dist'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },
});
/* eslint-enable key-spacing */
