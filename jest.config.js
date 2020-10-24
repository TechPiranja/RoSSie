module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {
    '^.+\\.js$': './node_modules/react-native/jest/preprocessor.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  transformIgnorePatterns: ['./node_modules/(?!(jest-)?react-native)'],
  coveragePathIgnorePatterns: ['./node_modules/', '/jest'],
  testEnvironment: 'jsdom',
};
