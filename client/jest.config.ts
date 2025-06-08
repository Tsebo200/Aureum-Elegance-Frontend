// Configure JEST
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
  },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']


}
export default config;


