export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/application/$1',
    '@infra/(.*)': '<rootDir>/infra/$1',
    '@helper/(.*)': '<rootDir>/helper/$1',
    '@types/(.*)': '<rootDir>/types/$1',
    '@enums/(.*)': '<rootDir>/enums/$1',
    '@test/(.*)': '<rootDir>/../test/$1',
    '@/(.*)': '<rootDir>/$1',
    '~/(.*)': '<rootDir>/$1',
  },
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
