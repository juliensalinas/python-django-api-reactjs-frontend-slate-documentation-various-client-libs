/* @flow */

import path from 'path';
import fs from 'fs';

import express from 'express';

import settings from '../settings';

let manifest;
let manifestContent;

try {
  manifestContent = fs.readFileSync(
    path.join(__dirname, '../../assets/manifest.json')
  );
  manifest = JSON.parse(manifestContent.toString('utf-8'));
} catch (err) {
  //
}

const {
  // $FlowFixMe
  PATHS,
} = settings;

/* eslint-disable babel/new-cap */
const router = express.Router();
/* eslint-enable babel/new-cap */

router.use('/vendor-dll.js',
  express.static(
    path.join(__dirname, '../../.dist/main.bundle.js')
  )
);

router.use('/favicon.ico',
  // $FlowFixMe
  express.static(PATHS.favicon)
);

router.use('/apple-app-site-association',
  // $FlowFixMe
  express.static(PATHS.appleAppSiteAssociation)
);

router.use('/img',
  express.static(PATHS.img)
);

router.use('/fonts',
  express.static(PATHS.fonts)
);

if (manifest != null) {
  router.use('/assets', express.static(PATHS.assets));
}

// router.use(express.static(PATHS.favicons));

export default router;
