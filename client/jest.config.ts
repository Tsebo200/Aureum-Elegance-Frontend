// Configure JEST
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy', // mock CSS/SCSS
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',                // Transform TS/TSX using ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest',             // Transform JS/JSX with Babel
  },
  transformIgnorePatterns: [
    '/node_modules/',                            // Ignore node_modules
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
}
export default config;


