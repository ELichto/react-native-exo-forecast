import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import { QueryClient } from '@tanstack/react-query';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import App from '../App';

global.fetch = jest.fn();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: '#03A9F4',
    background: '#f5f7fa',
    surface: '#FFFFFF',
  },
};

const mockWeatherData = {
  data: {
    timelines: [
      {
        timestep: '1h',
        intervals: [
          {
            startTime: '2021-03-24T14:47:00-04:00',
            values: {
              temperature: 57.0,
              temperatureApparent: 55.9,
              windSpeed: 3.0,
            },
          },
        ],
      },
    ],
  },
};

function TestWrapper({ children }) {
  const queryClient = new QueryClient();
  const persister = createAsyncStoragePersister({ storage: AsyncStorage });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </PersistQueryClientProvider>
  );
}

describe('Weather App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => { }));
    const { getByText } = render(<App />, { wrapper: TestWrapper });
    expect(getByText('Chargement des données météo...')).toBeTruthy();
  });

  it('renders weather data correctly after loading', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    const { getByText } = render(<App />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(getByText('Prévisions Météo (24h)')).toBeTruthy();
    });

    expect(getByText('57.0°C')).toBeTruthy();
    expect(getByText('55.9°C')).toBeTruthy();
    expect(getByText('3.0 km/h')).toBeTruthy();
  });

  it('renders error state when fetch fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const { getByText } = render(<App />, { wrapper: TestWrapper });

    await waitFor(() => {
      expect(getByText(/Une erreur est survenue/)).toBeTruthy();
    });
  });

  it('handles offline mode by showing cached data', async () => {
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        })
      )
      .mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    const queryClient = new QueryClient();
    const persister = createAsyncStoragePersister({ storage: AsyncStorage });

    const { getByText, rerender } = render(
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistQueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('57.0°C')).toBeTruthy();
    });

    rerender(
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistQueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('57.0°C')).toBeTruthy();
    });
  });
});
