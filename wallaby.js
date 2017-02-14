/*eslint-disable*/
'use strict';
const babelOptions = require('./package.json').babel;
module.exports = function (wallaby) {
  return {
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    files: [
      'src/**/*.js',
      '!src/**/*.test.js',
      './package.json'
    ],

    tests: [
      'src/**/*.test.js',
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel(babelOptions)
    },

    setup: function (w) {
      require('babel-polyfill');
      w.testFramework.configure(require('./package.json').jest);
    }
  };
};
