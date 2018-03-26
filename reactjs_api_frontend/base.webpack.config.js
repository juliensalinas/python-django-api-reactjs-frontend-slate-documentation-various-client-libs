/* @flow */

/* eslint-disable key-spacing */

import path              from 'path';

import webpack           from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin    from 'webpack-manifest-plugin';
import Md5Hash           from 'webpack-md5-hash';
import {
  merge,
  omit,
} from 'lodash';

const OPTIONS_TO_OMIT = [
  'localIdentName',
  'minimize',
  'NODE_ENV',
];

type Options = {
  NODE_ENV        : string,
  cache          ?: boolean,
  devtool        ?: string,
  localIdentName  : string,
  minimize        : boolean,
};

export function getOptions(options: Options): Options {
  return merge({}, {
    cache   : false,
    devtool : 'source-map',
    entry   : {
      bundle: ['./assets/jsx/client.jsx'],
    },
    output: {
      filename : '[name].[chunkhash].js',
      path     : path.resolve(__dirname, `.build/assets`),
    },
  }, options);
}

// $FlowFixMe
module.exports = function(options: Options): Object {
  options = getOptions(options);

  let developmentBabelPlugins = [];
  let cssLoader;
  let webpackPlugins = [];

  if (options.NODE_ENV === 'development') {
    developmentBabelPlugins.push('react-hot-loader/babel');
    cssLoader = [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          import: true,
          modules: true,
          minimize: false,
          importLoaders: 1,
          localIdentName: options.localIdentName,
        },
      },
      'postcss-loader',
    ];
    webpackPlugins = [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      /* eslint-disable import/no-unresolved */
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('./.dist/main-manifest.json'),
      }),
      /* eslint-enable import/no-unresolved */

      new webpack.IgnorePlugin(/assets\/manifest.json/),
    ];
  } else {
    cssLoader = ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          query: {
            import: true,
            modules: true,
            minimize: options.minimize,
            importLoaders: 1,
            localIdentName : options.localIdentName,
          },
        },
        'postcss-loader',
      ],
    });
    webpackPlugins = [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
      }),
      new Md5Hash(),
      new ManifestPlugin(),
      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module: Object): boolean => {
          return /node_modules/.test(module.resource);
        },
      }),
    ];
  }

  let jsxUse = [
    {
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
          ...developmentBabelPlugins,
          'transform-runtime',
          'syntax-export-extensions',
          'transform-export-extensions',
          'transform-class-properties',
          'transform-flow-comments',
        ],
      },
    },
  ];

  return {
    target : 'web',
    node   : {
      events : true,
      fs     : 'empty',
      tls    : 'empty',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: jsxUse,
        },
        {
          test: /\.(js|jsx)$/,
          include: /react\/src/,
          use: jsxUse,
        },
        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2|png|jpg|gif)/,
          use: [
            {
              loader: 'file-loader',
              query: {
                publicPath: '/assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize : true,
        debug    : false,
        optipng  : {
          interlaced        : false,
          optimizationLevel : 7,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.NODE_ENV),
      }),
      ...webpackPlugins,
      new webpack.NamedModulesPlugin(),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor', // Specify the common bundle's name.
      // }),
    ],
    externals: {
      nonexistingmodule: true,
      bufferutil: true,
      'utf-8-validate': true,
      redis: true,
      ws: true,
    },
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
    ...omit(options, OPTIONS_TO_OMIT),
  };
};
/* eslint-enable key-spacing */
