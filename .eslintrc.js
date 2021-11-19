module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'no-use-before-define': 'off',
  },
};
