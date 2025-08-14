const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://fakestoreapi.com",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "Fake Store API Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
});

