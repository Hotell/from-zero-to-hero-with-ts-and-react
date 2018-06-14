// @ts-check

const { defaults } = require('jest-config')

/**
 * @type {import('ts-jest/dist/jest-types').TsJestConfig}
 */
const tsJestConfig = {
  skipBabel: true
}

/**
 * @FIXME jest typings are bad, so we need to turn it off -> PR
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26304
 */
const transform = /** @type {any} */ ({
  '^.+\\.(ts|tsx)$': 'ts-jest'
})
/**
 * @type {Partial<jest.ProjectConfig>}
 */
const config = {
  transform,
  testMatch: [
    // ...defaults.testMatch,
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  globals: {
    'ts-jest': tsJestConfig
  }
}

module.exports = config
