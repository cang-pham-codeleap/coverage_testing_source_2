/**
 * Jest configuration file
 * Using JavaScript instead of TypeScript to avoid ts-node dependency
 */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./src",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",
  // Test coverage configuration
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/_*.{js,jsx,ts,tsx}",
    "!app/**/layout.{js,jsx,ts,tsx}",
    "!**/*.stories.{js,jsx,ts,tsx}",
    "!**/*.test.{js,jsx,ts,tsx}",
    "!app/api/**",
    "!**/*.config.js",
    "!**/*.config.ts",
    "!coverage/**",
    "!**/node_modules/**",
  ],
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Coverage report formats
  coverageReporters: ["lcov", "text", "text-summary", "cobertura"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
