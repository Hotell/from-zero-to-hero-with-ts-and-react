// @ts-check

const { defaults } = require('jest-config')

/**
 * @type {import('ts-jest/dist/jest-types').TsJestConfig}
 */
const tsJestConfig = {
  skipBabel: true
}

/**
 * @type {jest.InitialOptions}
 */
const config = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  globals: {
    'ts-jest': tsJestConfig
  }
}

module.exports = config
