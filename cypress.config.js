const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: './cypress/snapshots',
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 100000,
  requestTimeout: 100000,
  taskTimeout: 150000,
  responseTimeout: 100000,
  pageLoadTimeout: 100000,
  video: false,
  viewportHeight: 900,
  viewportWidth: 1000,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  env: {
    allureResultsPath: 'report/allure-results',
    allure: true,
    failSilently: false,
    failOnSnapshotDiff: true,
    cypressRunnerLocal: true,
  },
  retries: 0,
  projectId: '6ccunw',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: './cypress/specs/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
})
