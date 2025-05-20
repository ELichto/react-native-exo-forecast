import { fetchWeather } from '../../api/fetchWeather';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('fetchWeather', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should succesfuy fetch and process weather data', async () => {
    const mockResponse = {
      data: {
        timelines: [
          {
            timestep: '1h',
            startTime: '2024-01-01T00:00:00Z',
            endTime: '2024-01-02T00:00:00Z',
            intervals: [
              {
                startTime: '2024-01-01T00:00:00Z',
                values: {
                  precipitationIntensity: 0,
                  precipitationType: 0,
                  windSpeed: 5,
                  windGust: 10,
                  windDirection: 180,
                  temperature: 20,
                  temperatureApparent: 22,
                  cloudCover: 50,
                  cloudBase: 1000,
                  cloudCeiling: 3000,
                  weatherCode: 1000,
                },
              },
            ],
          },
        ],
      },
    };

    mock.onGet('/weather').reply(200, mockResponse);

    const weatherData = await fetchWeather();
    expect(weatherData).toEqual(mockResponse.data.timelines[0].intervals);
  });

  it('should throw an error if hourly forecast data is not found', async () => {
    const mockResponse = {
      data: {
        timelines: [
          {
            timestep: '3h',
            startTime: '2024-01-01T00:00:00Z',
            endTime: '2024-01-02T00:00:00Z',
            intervals: [],
          },
        ],
      },
    };

    mock.onGet('/weather').reply(200, mockResponse);
    await expect(fetchWeather()).rejects.toThrow('Hourly forecast data not found');
  });

  it('should throw an error if the API call fails', async () => {
    mock.onGet('/weather').reply(500);
    await expect(fetchWeather()).rejects.toThrow();
  });
});
