import '@testing-library/jest-native/extend-expect';


import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => { };
  return Reanimated;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');



// Mock react-native-paper
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  const DefaultTheme = {
    colors: {
      primary: '#000',
      accent: '#000',
      background: '#fff',
      surface: '#fff',
      text: '#000',
      disabled: '#000',
      placeholder: '#000',
      backdrop: '#000',
      notification: '#000',
    },
  };
  const Provider = ({ children }) => <View>{children}</View>;
  const Surface = ({ children, ...props }) => <View {...props}>{children}</View>;
  const ActivityIndicator = () => <View testID="activity-indicator" />;
  const Card = ({ children, style }) => (
    <View style={style}>{children}</View>
  );
  Card.Content = ({ children }) => (
    <View>{children}</View>
  );
  return {
    Provider,
    PaperProvider: Provider,
    Button: ({ children, onPress }) => (
      <View testID="paper-button" onPress={onPress}>
        {children}
      </View>
    ),
    Text: ({ children }) => <Text>{children}</Text>,
    Appbar: {
      Header: ({ children }) => <View>{children}</View>,
      Content: ({ title }) => <Text>{title}</Text>,
      Action: () => null,
    },
    Title: ({ children, style }) => (
      <Text style={style}>{children}</Text>
    ),
    Card,
    Surface,
    ActivityIndicator,
    useTheme: () => ({
      colors: {
        primary: '#1976D2',
        background: '#f5f7fa',
      },
    }),
    DefaultTheme,
  };
});
