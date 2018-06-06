// @ts-check

// Just testing 'jest-runner-tsc'
// `$ jest -c jest.tsc.config.js`
const { defaults } = require('jest-config')

/**
 * @type {Partial<jest.ProjectConfig>}
 */
const config = {
  runner: 'jest-runner-tsc',
  testMatch: [
    ...defaults.testMatch,
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx']
}

module.exports = config
