import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // using IP here because i am using an emulator (localhost won't work) 
});

export const fetchWeather = async () => {
  try {
    const response = await api.get('/weather');
    const data = response.data;
    const hourlyForecast = data.data.timelines.find(
      timeline => timeline.timestep === '1h'
    );

    if (!hourlyForecast) {
      throw new Error('Hourly forecast data not found');
    }
    return hourlyForecast.intervals;
  } catch (error) {
    console.error('here ??', error);
    throw error;
  }
}
