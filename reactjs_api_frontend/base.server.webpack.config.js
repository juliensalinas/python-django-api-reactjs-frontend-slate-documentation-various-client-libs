/* @flow */

/* eslint-disable key-spacing */

import path              from 'path';
import webpack           from 'webpack';
import nodeExternals     from 'webpack-node-externals';

type Options = {
  NODE_ENV    : string,
  buildFolder : string,
};

module.exports = function(options: Options): Object {
  return {
    target: 'node',
    devtool: 'source-map',
    node : {
      fs: 'empty',
      tls: 'empty',
      events: true,
    },
    entry: {
      server: ['./assets/jsx/server.jsx'],
    },
    output: {
      filename: 'server.bundle.js',

      path: path.resolve(__dirname, `${options.buildFolder}/src`),

      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', {
                modules: false,
              }],
              'stage-2',
              'react',
            ],
            plugins: [
              'transform-runtime',
              'syntax-export-extensions',
              'transform-export-extensions',
              'transform-class-properties',
            ],
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|css)/,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            publicPath: '/assets/',
          },
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env.SERVER_SIDE': JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify(options.NODE_ENV),
      }),
      new webpack.NamedModulesPlugin(),
    ],
    externals: [
      nodeExternals({
        whitelist: ['events'],
      }),
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, 'assets'),
        'node_modules',
      ],
      extensions: [
        '.js',
        '.jsx',
      ],
    },
    stats: {
      hash        : true,
      version     : true,
      timings     : true,
      assets      : true,
      chunks      : false,
      chunkModules: true,
      modules     : false,
      cached      : true,
      reasons     : true,
      source      : false,
      errorDetails: true,
      chunkOrigins: true,
    },
  };
};
/* eslint-enable key-spacing */
