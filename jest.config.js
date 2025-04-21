const dom = process.env.DOM;
export default {
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
  coveragePathIgnorePatterns: ['<rootDir>/jest-node.setup.js', '<rootDir>/jest-jsdom.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/*.spec.+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }]
  },
  setupFiles: dom ? ['<rootDir>/jest-jsdom.setup.js'] : ['<rootDir>/jest-node.setup.js'],
  testEnvironment: dom ? 'jsdom' : 'node'
};
