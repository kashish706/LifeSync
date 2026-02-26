const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city) => {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweather_api_key_here') {
        throw new Error('OpenWeather API key not configured. Please add VITE_WEATHER_API_KEY to your .env file.');
    }
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'City not found. Please try again.');
    }
    return response.json();
};

export const fetchForecast = async (city) => {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'your_openweather_api_key_here') {
        throw new Error('OpenWeather API key not configured.');
    }
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&cnt=5`
    );
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Forecast unavailable.');
    }
    return response.json();
};
