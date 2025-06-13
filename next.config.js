/**
 * Next.js configuration with test coverage support
 * - Optimizes output for testing environments
 * - Enables proper module resolution during tests
 */
const nextConfig = {
  // Disable unnecessary optimizations in test environment
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV !== "test",

  // Handle module aliases consistently between app and tests
  webpack: (config) => {
    // Allows importing of test files in the app directory
    if (process.env.NODE_ENV === "test") {
      // Handle image imports in tests
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
    }
    return config;
  },
};

module.exports = nextConfig;
