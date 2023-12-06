module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-config-sass-guidelines',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    // 'number-leading-zero': 'never',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin', 'value'],
      },
    ],
    'max-nesting-depth': [2],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export'],
      },
    ],
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box'],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
      },
    ],
    'selector-class-pattern': null,
  },
};
