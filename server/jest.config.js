module.exports = {
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-results",
        outputName: "junit.xml",
      },
    ],
    [
      "jest-html-reporter",
      {
        pageTitle: "Server Test Report",
        outputPath: "./test-results/index.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};
