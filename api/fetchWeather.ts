import axios from 'axios';

type WeatherData = {
  timestep: string;
  startTime: string;
  endTime: string;
  intervals: Array<{
    startTime: string;
    values: {
      precipitationIntensity: number;
      precipitationType: number;
      windSpeed: number;
      windGust: number;
      windDirection: number;
      temperature: number;
      temperatureApparent: number;
      cloudCover: number;
      cloudBase: number | null;
      cloudCeiling: number | null;
      weatherCode: number;
    };
  }>;
};

export const fetchWeather = async () => {
  const api = axios.create({
    baseURL: 'http://10.0.2.2:3000', // using IP here because i am using an emulator (localhost won't work)
  });
  try {
    const response = await api.get('/weather');
    const data = response.data;
    const hourlyForecast = data.data.timelines.find(
      (timeline: WeatherData) => timeline.timestep === '1h'
    );

    if (!hourlyForecast) {
      throw new Error('Hourly forecast data not found');
    }
    return hourlyForecast.intervals;
  } catch (error) {
    throw error;
  }
};
