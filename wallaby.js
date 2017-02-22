/*eslint-disable*/
'use strict';
module.exports = function (wallaby) {
  return {
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    files: [
      'src/**/*.ts',
      '!src/**/*.test.ts',
      './package.json'
    ],

    tests: [
      'src/**/*.test.ts',
    ],

    setup: function (w) {
    }
  };
};
