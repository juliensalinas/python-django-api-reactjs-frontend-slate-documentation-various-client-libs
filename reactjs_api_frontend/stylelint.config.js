/* eslint-disable key-spacing */

module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-vendor-prefix': true,
    'block-closing-brace-space-before': ['always-single-line'],
    'block-opening-brace-newline-after': ['always-multi-line'],
    'declaration-block-properties-order': ['alphabetical'],
    'declaration-colon-space-after': ['always'],
    'declaration-colon-space-before': ['never'],
    'function-url-quotes': ['always'],
    // indentation: [2, {
    //   indentClosingBrace: false,
    // }],
    'length-zero-no-unit': true,
    'media-feature-name-no-vendor-prefix': true,
    'number-no-trailing-zeros': true,
    'property-no-vendor-prefix': true,
    'root-no-standard-properties': true,
    'rule-nested-empty-line-before':['always', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'rule-non-nested-empty-line-before': ['always-multi-line', {
      ignore: ['after-comment'],
    }],
    'selector-no-vendor-prefix': true,
    'selector-root-no-composition': true,
    'string-quotes': ['single'],
    'value-list-comma-space-before': ['never'],
    'value-no-vendor-prefix': true,
  },
};
/* eslint-enable key-spacing */
