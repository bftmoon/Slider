module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'plugin:fsd/all', 'plugin:jest/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'fsd', 'jest'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling"],
        ],
        'newlines-between': "always",
        alphabetize: {order: 'asc', caseInsensitive: true}
      }
    ],
  },
};
