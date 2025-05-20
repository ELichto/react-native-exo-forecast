import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherItem from '../../components/WeatherItem';

// Mock formateDate 
jest.mock('../../utils/formatDate', () => ({
  formatDateTime: () => ({ time: '12:00', date: '20/03/2024' })
}));

// Mock vector icons
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
jest.mock('react-native-vector-icons/Feather', () => 'Feather');

describe('WeatherItem', () => {
  const mockItem = {
    startTime: '2024-03-20T12:00:00Z',
    values: {
      temperature: 72.5,
      temperatureApparent: 70.2,
      windSpeed: 10.5,
      windGust: 15.2,
      windDirection: 180,
      precipitationIntensity: 0,
      precipitationType: 0,
      cloudCover: 30,
      cloudBase: null,
      cloudCeiling: null,
      weatherCode: 1000
    }
  };

  it('renders weather information correctly', () => {
    const { getByText } = render(<WeatherItem item={mockItem} />);

    expect(getByText('12:00')).toBeTruthy();
    expect(getByText('72.5°F')).toBeTruthy();
    expect(getByText('Ressenti 70.2°F')).toBeTruthy();
    expect(getByText('10.5 km/h')).toBeTruthy();
  });

  it('renders with different weather values', () => {
    const differentItem = {
      ...mockItem,
      values: {
        ...mockItem.values,
        temperature: 85.0,
        temperatureApparent: 82.0,
        windSpeed: 5.0
      }
    };

    const { getByText } = render(<WeatherItem item={differentItem} />);

    expect(getByText('85.0°F')).toBeTruthy();
    expect(getByText('Ressenti 82.0°F')).toBeTruthy();
    expect(getByText('5.0 km/h')).toBeTruthy();
  });
}); 
