module.exports = {
  collectCoverage: false,
  preset: 'jest-preset-stylelint',
  roots: ['<rootDir>/lib'],
  testMatch: ['{,**/}__tests__/{,**/}*.spec.js'],
  testPathIgnorePatterns: ['node_modules', 'skip\\.spec\\.js$'],
  transform: {},
};
