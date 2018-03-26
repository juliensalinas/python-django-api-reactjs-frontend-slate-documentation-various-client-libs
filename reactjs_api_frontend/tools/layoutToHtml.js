/* @flow */

/* eslint-disable camelcase */

import fs from 'fs';

import {html_beautify} from 'js-beautify';

import {getLayout} from '../src/modules';
import {
  PRODUCTION_ASSETS_PATH,
} from '../src/constants';

function getManifest(): Object {
  try {
    var manifestFilename = process.argv[process.argv.length - 1];
    var manifestContent = fs.readFileSync(manifestFilename);
    return JSON.parse(manifestContent.toString('utf-8'));
  } catch (err) {
    throw err;
  }
}

var manifest = getManifest();

var layoutOpts = {};

if (process.env.NODE_ENV === 'production') {
  layoutOpts = {
    assetsPath   : PRODUCTION_ASSETS_PATH,
    faviconsPath : PRODUCTION_ASSETS_PATH,
  };
}

var layout = getLayout({
  manifest,
  ...layoutOpts,
});

// Beautify the HTML
layout = html_beautify(layout, {
  indent_size : 2,
  type        : 'html',
});

process.stdout.write(layout);
/* eslint-enable camelcase */
