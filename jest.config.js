module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-paper|@react-native-async-storage|@react-native-community|react-native-vector-icons|react-native-gesture-handler)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '^react-native-vector-icons/(.*)$': '<rootDir>/node_modules/react-native-vector-icons/$1',
  },
  testEnvironment: 'node',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
