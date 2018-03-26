/* @flow */

import path from 'path';
import fs from 'fs';

import React from 'react';

import settings from '../settings';
import {
  LOCALES,
  WEBSITE_TITLE,
} from '../constants';
import {renderLayoutToStaticMarkup} from '../../assets/jsx/LayoutServer';

const {
  // $FlowFixMe
  BASE_SELF_HOSTNAME,
  // $FlowFixMe
  BASE_SELF_SCHEME,
} = settings;

let manifest;
let manifestContent;

try {
  manifestContent = fs.readFileSync(
    path.join(__dirname, '../../assets/manifest.json')
  );
  /* istanbul ignore next */
  manifest = JSON.parse(manifestContent.toString('utf-8'));
} catch (err) {
  //
}

/**
 * Return a React generated string version of the layout.
 *
 * Any unknown key will be passed as props to the `LayoutServer` component.
 *
 * @param  {Object} opts
 * @return {string}       - The string version of the layout
 */
export function getLayout(opts: Object = {}): string {
  let layout = renderLayoutToStaticMarkup({
    baseSelfHostname : BASE_SELF_HOSTNAME,
    baseSelfScheme   : BASE_SELF_SCHEME,
    locales          : LOCALES,
    manifest,
    title            : WEBSITE_TITLE,
    ...opts,
  });
  return `<!doctype html>${layout}`;
}
