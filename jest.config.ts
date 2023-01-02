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
    '~/(.*)': '<rootDir>/../$1',
  },
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/application/use-cases/errors/index.ts',
    '<rootDir>/application/use-cases/notification/index.ts',
    '<rootDir>/application/use-cases/user/index.ts',
    '<rootDir>/enums',
    '<rootDir>/helper',
    '<rootDir>/types',
  ],
  testEnvironment: 'node',
};
