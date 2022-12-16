const path = require('path')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  downloadsFolder: path.join(__dirname, '/cypress/downloads'),
  fileServerFolder: path.resolve(__dirname),
  fixturesFolder: path.join(__dirname, '/cypress/fixtures'),
  screenshotsFolder: path.join(__dirname, '/cypress/screenshots'),
  videosFolder: path.join(__dirname, '/cypress/videos'),
  e2e: {
    supportFile: path.join(__dirname, '/cypress/support/e2e.{js,jsx,ts,tsx}'),
    specPattern: path.join(__dirname, '/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'),
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
