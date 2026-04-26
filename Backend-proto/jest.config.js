module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/config/JestPolyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/JestSetup.js'],
  collectCoverage: true,
  coverageDirectory: './test/coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'middlesware/**/*.js',
    'routes/**/*.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/server.js'],
  testPathIgnorePatterns: ['/node_modules/', '/test/coverage/'],
};
