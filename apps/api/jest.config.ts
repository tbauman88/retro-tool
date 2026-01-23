/* eslint-disable */
module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  clearMocks: true,
  testEnvironment: require('path').join(__dirname, './prisma-test-environment.ts'),
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  coverageReporters: ['lcov', 'text'],
};
