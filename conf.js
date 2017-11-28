var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter'),
  //TimeStamp = require('./e2e/page_object/timestamp.js'),
  //timeStamp = new TimeStamp(),

  reporter = new HtmlScreenshotReporter({
    dest: 'results/Test running at ',
    filename: 'Report of running autotests.html',
    showSummary: true,
    showQuickLinks: true,
    showConfiguration: true,
    reportTitle: 'My report for autotests at ',
    ignoreSkippedSpecs: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true
  });

exports.config = {
   seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 4
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  //specs: ['searchYandex/searchYandex_spec.js'],

  suites: {
    registrationMasterTest: ['specs/registrationMasterTest/*_spec.js'],
  },

  allScriptsTimeout: 4000000,
  // Options to be passed to Jasmine.

  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 300000
  },

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function () {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(reporter);
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};