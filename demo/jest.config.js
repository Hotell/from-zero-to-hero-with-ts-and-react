// @ts-check

/**
 * @type {jest.InitialOptions}
 */
const config = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: [ 'js','ts', 'tsx'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-enzyme.js',
  snapshotSerializers: ['enzyme-to-json/serializer']
}

module.exports = config
