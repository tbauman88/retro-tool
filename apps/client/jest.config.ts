/* eslint-disable */
export default {
  displayName: 'client',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/client',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
