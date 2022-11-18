const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'https://staffbase.com/jobs/quality-assurance-engineer-2021_1730/apply',
    specPattern: 'cypress/e2e/**/*.{js, jsx, ts, tsx}'
  },
});
