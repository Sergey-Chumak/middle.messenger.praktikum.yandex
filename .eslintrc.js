module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-constructor-return': 'off',
    'no-unused-expressions': 'off',
    'no-prototype-builtins': 'off',
    'new-cap': 'off',
    'func-names': 'off',
    'max-len': ['error', { code: 120, tabWidth: 4 }],
  },
};
