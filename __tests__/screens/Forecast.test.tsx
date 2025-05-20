import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Forecast from '../../screens/Forecast';
import { useWeather } from '../../hooks/useWeather';
import { useNetInfo } from '@react-native-community/netinfo';
import { ReactNode } from 'react';

jest.mock('../../hooks/useWeather');
jest.mock('@react-native-community/netinfo');

jest.mock('../../components/WeatherItem', () => {
  const { View } = require('react-native');
  return function MockWeatherItem({ item }: { item: { startTime: string; values: any } }) {
    return <View testID="weather-item" />;
  };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');


const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;
const mockUseNetInfo = useNetInfo as jest.MockedFunction<typeof useNetInfo>;

describe('Forecast', () => {
  beforeEach(() => {
    mockUseNetInfo.mockReturnValue({
      isInternetReachable: true,
      isConnected: true,
    } as any);
  });

  it('renders loading state', async () => {
    mockUseWeather.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as any);

    const { getByText, getByTestId } = render(<Forecast />);
    await waitFor(() => {
      expect(getByText('Chargement des données météo...')).toBeTruthy();
      expect(getByTestId('activity-indicator')).toBeTruthy();
    });
  });

  it('renders error state', async () => {
    const errorMessage = 'Failed to fetch weather data';
    mockUseWeather.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error(errorMessage),
      refetch: jest.fn(),
    } as any);

    const { getByText } = render(<Forecast />);
    await waitFor(() => {
      expect(getByText(`Une erreur est survenue: ${errorMessage}`)).toBeTruthy();
    });
  });

  it('renders weather data correctly', async () => {
    mockUseWeather.mockReturnValue({
      data: [{
        startTime: '2024-03-20T12:00:00Z',
        values: {
          temperature: 72.5,
          temperatureApparent: 70.2,
          windSpeed: 10.5,
        }
      }],
      isPending: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as any);

    const { getByText, getByTestId } = render(<Forecast />);
    await waitFor(() => {
      expect(getByText('Prévisions Météo')).toBeTruthy();
      expect(getByTestId('weather-item')).toBeTruthy();
    });
  });
}); 
