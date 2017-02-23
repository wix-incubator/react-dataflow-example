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

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript()
    },

    setup: function (wallaby) {
      wallaby.testFramework.configure({ resetModules: true, resetMocks: true });
    }
  };
};
