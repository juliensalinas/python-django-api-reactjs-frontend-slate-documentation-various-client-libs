/* @flow */

const types = {
  primary: {
    backgroundColor : '#0073b1',
    borderColor     : '#0073b1',
    color           : '#fff',
  },
};

export default {
  ...baseVars,
  ...types,

  input_border       : '1px solid rgba(0, 0, 0, 0.25)',
  input_boxShadow    : 'none',
  input_borderRadius : '2px',

  ButtonGroup_textAlign: 'center',

  LinkButton_borderRadius: 0,

  FormGroup__input_width : '100%',
  FormGroup__input_flex  : 'none',
};
/* eslint-enable max-len */
