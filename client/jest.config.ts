// Configure JEST
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', //library managing our tests
    testEnvironment: 'jsdom', //Test environment
    globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',  // 👈 Explicitly use the test config
    },
  },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']


}
export default config;