// @ts-check

/**
 * @type {jest.InitialOptions}
 */
const config = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-enzyme.js',
  snapshotSerializers: ['enzyme-to-json/serializer']
}

module.exports = config
