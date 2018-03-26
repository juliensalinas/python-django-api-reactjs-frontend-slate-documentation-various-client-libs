/* @flow */


let EXPRESS_PORT = 3000;

/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  EXPRESS_PORT = 4000;
}

export const EXPRESS = {
  address : '0.0.0.0',
  port    : Number(process.env.PORT || EXPRESS_PORT),
};
