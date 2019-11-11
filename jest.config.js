module.exports = {
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  cacheDirectory: '<rootDir>/jest_cache',
  moduleNameMapper: {
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '.+\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/testHelper/jestSetup.js'],
  testRegex: '__tests__/.*\\.test\\.js$',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
