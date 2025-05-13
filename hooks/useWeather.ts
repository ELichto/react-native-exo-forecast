import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/fetchWeather';

export const useWeather = () => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });
};
