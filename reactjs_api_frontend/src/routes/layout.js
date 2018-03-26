/* @flow */


/* eslint-disable no-inner-declarations */
import React   from 'react';
import express from 'express';

import {getLayout} from '../modules';
import {
  LOCALES,
} from '../constants';

/* eslint-disable babel/new-cap */
const router = express.Router();
/* eslint-enable babel/new-cap */

router.get('*', (req: express$Request, res: express$Response): void => {
  res.send(getLayout({
    // $FlowFixMe
    forceLocale: req.acceptsLanguages(LOCALES),
  }));
});

export default router;
/* eslint-enable no-inner-declarations */
