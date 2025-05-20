import 'react-native';
import React from 'react';
import App from '../App';
import { queryClient } from '../App';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClientProvider } from '@tanstack/react-query';

import { it, beforeEach, afterEach, afterAll } from '@jest/globals';

jest.mock('@tanstack/react-query-persist-client', () => ({
  PersistQueryClientProvider: ({ children, client }: any) => {
    const { QueryClientProvider } = require('@tanstack/react-query');
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  },
}));

beforeEach(() => {
  queryClient.clear();
});

afterEach(async () => {
  await queryClient.cancelQueries();
  queryClient.clear();
  queryClient.unmount();
});

afterAll(() => {
  jest.clearAllTimers();
});

it('renders correctly', async () => {
  const { toJSON } = render(<App />);

  await waitFor(() => {
    expect(toJSON()).not.toBeNull();
  }, {
    timeout: 5000
  });
});
