import { useState, useCallback } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`
      );

      const data = response.data;
      setWeather({
        temperature: Math.round(data.main.temp), 
        feels_like: Math.round(data.main.feels_like),  
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        wind_direction: data.wind.deg,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,  
      });
    } catch (err) {
      console.error("Error fetching weather data:", err); 
      setError('Erreur lors de la récupération de la météo.');  
    } finally {
      setLoading(false);
    }
  }, [API_KEY_WEATHER]);

  return { weather, fetchWeather, loading, error };
};

export default useWeather;
