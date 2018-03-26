/* @flow */

/* eslint-disable quote-props */

// import postcss from 'postcss';

export default function defaultMixins(vars: Object): Object {
  return {
    ...baseMixins(vars),
    'form-control': (mixin: Object): Object => {
      return {
        '&': {
          'border-radius'  : vars.input_borderRadius,
          'border'         : vars.input_border,
          'box-shadow'     : vars.input_boxShadow,
          'display'        : vars.input_display,
          'padding'        : vars.input_padding,
          'vertical-align' : vars.input_verticalAlign,
          'width'          : vars.input_width,
          'outline'        : 0,
        },
        '&:focus': {
          'border-color' : '#0084bf',
          'box-shadow'   : '0 0 0 1px #0084bf',
        },
        '&:hover': {
          'border-color': 'rgba(0, 0, 0, 0.55)',
        },
      };
    },
  };
}

/* eslint-enable quote-props */
