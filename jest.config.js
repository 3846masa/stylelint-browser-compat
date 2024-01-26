module.exports = {
  collectCoverage: false,
  preset: 'jest-preset-stylelint',
  roots: ['<rootDir>/lib'],
  runner: 'jest-light-runner',
  testMatch: ['{,**/}__tests__/{,**/}*.spec.js'],
  testPathIgnorePatterns: ['node_modules', 'skip\\.spec\\.js$'],
  transform: {},
};
