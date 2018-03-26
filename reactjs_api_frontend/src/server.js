/* @flow */

import http         from 'http';

import express      from 'express';
import bodyParser   from 'body-parser';
import errorHandler from 'errorhandler';
import exlog        from 'exlog';

import settings     from './settings';
import routes       from './routes';
import {
  getIntHandler,
} from './instances';

exlog.addTransformer(exlog.transformers.errorTransformer);
exlog.addHandler('express', exlog.handlers.expressHandler);

exlog.persistent('tag', 'server');

exlog.logUncaughtExceptions();
exlog.logUnhandledRejections();
exlog.logWarnings();

exlog.setStyles('website', {
  bgColor   : 'yellow',
  bold      : true,
  color     : 'white',
  upperCase : true,
});

exlog.setStylesForTag('website', 'website');

const {
  EXPRESS,
} = settings;

const intHandler = getIntHandler();

module.exports = (): void => {
  let app = express();
  app.set('trust proxy', true);

  exlog.handle('express', app);

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorHandler());
  }

  app.use(routes.statics);
  app.use('/check', routes.check);
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  app.use(bodyParser.json());
  app.use(routes.layout);

  exlog.tag('website').info('All routes initialised');

  let server = http.createServer(app);

  server.listen(EXPRESS.port, EXPRESS.address, 511, (): void => {
    exlog.tag('express').info(`Express server listening on port ${EXPRESS.port}`);
  });

  intHandler.on('beforeExit', (): Server => {
    exlog.tag('express').info('Closing HTTP server');
    return server.close();
  });
};

if (require.main === module) {
  module.exports();
}
