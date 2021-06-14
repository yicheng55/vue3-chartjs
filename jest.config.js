module.exports = {
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts?$': 'babel-jest',
  },
  setupFiles: ['jest-canvas-mock'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary']
}
