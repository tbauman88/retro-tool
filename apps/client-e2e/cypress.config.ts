import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
    }),
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    specPattern: './src/integration/**/*.spec.ts',
    supportFile: './src/support/index.ts',
    video: true,
    videosFolder: '../../dist/cypress/apps/client-e2e/videos',
    screenshotsFolder: '../../dist/cypress/apps/client-e2e/screenshots',
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    env: {
      apiUrl: 'http://127.0.0.1:3333',
    },
  },
});
