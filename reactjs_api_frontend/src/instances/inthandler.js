/* @flow */

import IntHandler from 'inthandler';

var intHandler;

export function getIntHandler(): IntHandler {
  if (intHandler == null) {
    intHandler = new IntHandler();
  }

  return intHandler;
}
