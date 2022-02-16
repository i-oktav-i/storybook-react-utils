import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset:             'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  // Automatically clear mock calls, instances and results before every test
  clearMocks:         true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage:    true,
  // The directory where Jest should output its coverage files
  coverageDirectory:  'coverage',
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters:  process.env.IS_CI === 'true'
    ? [
      'json',
    ]
    : [
      'text',
    ],
  // The test environment that will be used for testing
  testEnvironment:   'jest-environment-jsdom',
  moduleDirectories: [
    './node_modules/',
    './src/',
  ],
};
export default config;
