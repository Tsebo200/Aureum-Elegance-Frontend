// Configure JEST
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy', // mock CSS/SCSS
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',                // Transform TS/TSX using ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest',             // Transform JS/JSX with Babel
  },
  transformIgnorePatterns: [
    '/node_modules/',       // Ignore node_modules
  ],

  // setupFilesAfterEnv: ['client/setupTests.ts'],
   setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json',  // Explicitly use the test config
        },
    },
}

export default config;


