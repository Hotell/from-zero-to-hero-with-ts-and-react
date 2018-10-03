// @ts-check

/**
 * @type {jest.InitialOptions}
 */
const config = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testPathIgnorePatterns: ['out-tsc'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-tests.ts'
}

module.exports = config
