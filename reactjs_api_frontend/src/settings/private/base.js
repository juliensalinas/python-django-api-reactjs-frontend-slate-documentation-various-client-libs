/* @flow */

import path from 'path';

import {
  G_PATH_ROOT,
} from './global';

export const PATHS = {
  appleAppSiteAssociation : path.join(G_PATH_ROOT, 'assets/apple-app-site-association'),
  assets                  : path.join(G_PATH_ROOT, 'assets'),
  css                     : path.join(G_PATH_ROOT, 'assets/css'),
  favicon                 : path.join(G_PATH_ROOT, 'assets/favicon.ico'),
  favicons                : path.join(G_PATH_ROOT, 'assets/favicons'),
  fonts                   : path.join(G_PATH_ROOT, 'assets/fonts'),
  img                     : path.join(G_PATH_ROOT, 'assets/img'),
  js                      : path.join(G_PATH_ROOT, 'assets/js'),
  layout                  : path.join(G_PATH_ROOT, 'assets/jsx/layout'),
};

export const WEBPACK = {
  devServer: {
    ip     : '0.0.0.0',
    listen : '0.0.0.0',
    port   : 3001,
  },
};
