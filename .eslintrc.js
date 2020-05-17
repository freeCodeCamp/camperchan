module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'plugin:prettier/recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always']
  }
};
