/* @flow */

import path from 'path';

import {
  G_PATH_ROOT,
} from './global';

export const PATHS = {
  assets : path.join(G_PATH_ROOT, '.build/assets'),
  css    : path.join(G_PATH_ROOT, '.build/assets/css'),
  fonts  : path.join(G_PATH_ROOT, '.build/assets/fonts'),
  img    : path.join(G_PATH_ROOT, '.build/assets/img'),
  js     : path.join(G_PATH_ROOT, '.build/assets/js'),
  layout : path.join(G_PATH_ROOT, '.build/assets/jsx/layout'),
};

export const BASE_SELF_SCHEME   = 'https://';
export const BASE_SELF_HOSTNAME = 'test.com';
