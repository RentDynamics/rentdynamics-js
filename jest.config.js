module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coveragePathIgnorePatterns: ['<rootDir>/jest-node.setup.ts', '<rootDir>/jest-jsdom.setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.spec.+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFiles: process.env.DOM
    ? ['<rootDir>/jest-jsdom.setup.ts']
    : ['<rootDir>/jest-node.setup.ts'],
  testEnvironment: process.env.DOM ? 'jsdom' : 'node'
};
