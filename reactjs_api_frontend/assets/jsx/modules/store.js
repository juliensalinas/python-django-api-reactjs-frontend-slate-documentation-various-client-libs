/* @flow */

/*
 * Copyright 2017-present, My App, Inc.
 * All rights reserved.
 */

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import reducer from '../reducers';
import rootSaga from '../sagas';

let _store;

/**
 * Return a redux store instance
 * @return {Object}
 */
/* istanbul ignore next */
export function getStore(): Object {
  /* istanbul ignore next */
  if (_store == null) {
    let middlewares = [];

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      let logger = createLogger();
      middlewares.push(logger);
    }

    let sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // Creates the Redux store using our reducer and the logger and saga middlewares
    _store = createStore(
      reducer,
      composeEnhancers(
        applyMiddleware(
          ...middlewares,
        )
      )
    );
    // We run the root saga automatically
    sagaMiddleware.run(rootSaga);
  }

  /* istanbul ignore next */
  return _store;
}
