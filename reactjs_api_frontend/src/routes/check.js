/* @flow */

import express from 'express';

/* eslint-disable babel/new-cap */
const router = express.Router();
/* eslint-enable babel/new-cap */

// Route for dokku CHECKS
router.get('/', (req: express$Request, res: express$Response): void => {
  res.send('ok');
});

export default router;
