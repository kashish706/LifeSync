import React, { useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecast } from '../api/weatherApi';
import useFetch from '../hooks/useFetch';
import { getWeatherGradient, formatTemperature, getWeatherIcon } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faWind, faTint, faCompass, faThermometerHalf,
    faMapMarkerAlt, faCalendarAlt, faSun, faCloud, faMoon,
    faCloudSun, faCloudMoon, faCloudShowersHeavy, faCloudRain,
    faBolt, faSnowflake, faSmog
} from '@fortawesome/free-solid-svg-icons';

const WeatherDashboard = () => {
    const [city, setCity] = useState('New Delhi');
    const [searchInput, setSearchInput] = useState('');

    const { data: weather, loading: weatherLoading, error: weatherError, execute: executeWeather } = useFetch();
    const { data: forecast, loading: forecastLoading, error: forecastError, execute: executeForecast } = useFetch();

    const iconMap = {
        faSun, faMoon, faCloud, faCloudSun, faCloudMoon,
        faCloudShowersHeavy, faCloudRain, faBolt, faSnowflake, faSmog
    };

    useEffect(() => {
        executeWeather(fetchWeatherByCity, city);
        executeForecast(fetchForecast, city);
    }, [city, executeWeather, executeForecast]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setCity(searchInput);
            setSearchInput('');
        }
    };

    const bgGradient = weather ? getWeatherGradient(weather.weather[0].main) : 'var(--bg-gradient)';

    return (
        <div
            className="weather-page py-5 pt-lg-7 min-vh-100 position-relative animate-fade-in"
            style={{
                background: bgGradient,
                transition: 'background 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            {/* Heavy dark overlay for perfect accessibility */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-black" style={{ opacity: 0.5, pointerEvents: 'none' }}></div>

            <div className="container mt-5 position-relative z-1">
                {/* Scoped CSS to ensure text visibility and card transparency */}
                <style>{`
          .weather-page, .weather-page h1, .weather-page h2, .weather-page h3, 
          .weather-page h4, .weather-page h5, .weather-page h6, .weather-page p, 
          .weather-page span, .weather-page div:not(.progress-bar):not(.badge) {
            color: #ffffff !important;
          }
          .weather-card-item {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 20px !important;
            padding: 0.75rem 1rem !important;
            transition: all 0.3s ease !important;
          }
          .weather-card-item:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            transform: translateY(-2px) !important;
          }
          .main-glass-container {
            background: rgba(0, 0, 0, 0.45) !important;
            backdrop-filter: blur(40px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 30px !important;
          }
          .forecast-box {
            background: rgba(0, 0, 0, 0.3) !important;
            backdrop-filter: blur(40px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            border-radius: 30px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .weather-input-container {
             background: rgba(0, 0, 0, 0.4) !important;
             backdrop-filter: blur(20px) !important;
             border: 1px solid rgba(255, 255, 255, 0.2) !important;
             border-radius: 50px !important;
          }
          .weather-page .form-control::placeholder {
            color: rgba(255,255,255,0.7) !important;
          }
          .weather-page .form-control {
            color: #ffffff !important;
          }
        `}</style>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Search Header */}
                        <div className="text-center mb-5">
                            <h1 className="display-4 fw-900 mb-2">Weather Dashboard</h1>
                            <p className="fw-700 opacity-90" style={{ fontSize: '1.2rem' }}>Real-time climate insights across the globe.</p>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-5 px-xl-5">
                            <div className="input-group d-flex align-items-center weather-input-container p-1 shadow-2xl">
                                <span className="ps-4 opacity-80">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-transparent shadow-none px-3 py-3 fw-600"
                                    placeholder="Enter city name..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    style={{ fontSize: '1.25rem' }}
                                />
                                <div className="pe-1">
                                    <button className="btn btn-primary rounded-pill px-4 py-2 fw-800 shadow-lg" type="submit">
                                        <FontAwesomeIcon icon={faSearch} className="me-2" /> Search
                                    </button>
                                </div>
                            </div>
                        </form>

                        {(weatherLoading || forecastLoading) && <LoadingSpinner />}
                        {(weatherError || forecastError) && <ErrorMessage message={weatherError || forecastError} onRetry={() => executeWeather(fetchWeatherByCity, city)} />}

                        {weather && !weatherLoading && !weatherError && (
                            <div className="animate-fade-in">
                                <div className="row g-4">
                                    {/* Left Column: Main Weather */}
                                    <div className="col-lg-7">
                                        <div className="main-glass-container p-4 p-md-5 h-100 shadow-2xl position-relative overflow-hidden">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div>
                                                    <h2 className="display-4 fw-900 mb-0">{weather.name}</h2>
                                                    <span className="badge bg-primary px-3 py-2 rounded-pill mt-2 fw-800 shadow-sm">{weather.sys.country}</span>
                                                </div>
                                                <div className="text-end">
                                                    <p className="h3 mb-0 fw-900">{new Date().toLocaleDateString(undefined, { weekday: 'long' })}</p>
                                                    <p className="fw-800 opacity-100">{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
                                                </div>
                                            </div>

                                            <div className="row align-items-center my-4 my-md-5 gx-4">
                                                <div className="col-md-7 text-center text-md-start">
                                                    <h2 className="fw-900 mb-0" style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', letterSpacing: '-3px', lineHeight: 1, textShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
                                                        {formatTemperature(weather.main.temp)}
                                                    </h2>
                                                    <p className="h2 fw-900 text-capitalize opacity-100 mt-2">{weather.weather[0].description}</p>
                                                </div>
                                                <div className="col-md-5 text-center mt-4 mt-md-0">
                                                    <div className="d-inline-block p-3 p-md-4 rounded-circle bg-white bg-opacity-10 animate-bounce-slow shadow-lg">
                                                        <FontAwesomeIcon
                                                            icon={iconMap[getWeatherIcon(weather.weather[0].main, weather.weather[0].icon)] || faCloud}
                                                            style={{ fontSize: 'clamp(4rem, 6vw, 6.5rem)', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.7))' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-4">
                                                {[
                                                    { icon: faThermometerHalf, label: 'Feel', value: formatTemperature(weather.main.feels_like) },
                                                    { icon: faTint, label: 'Humid', value: `${weather.main.humidity}%` },
                                                    { icon: faWind, label: 'Wind', value: `${weather.wind.speed}m/s` },
                                                    { icon: faCompass, label: 'Press', value: `${weather.main.pressure}` }
                                                ].map((item, idx) => (
                                                    <div className="col-3" key={idx}>
                                                        <div className="weather-card-item p-2 p-md-3 text-center">
                                                            <FontAwesomeIcon icon={item.icon} className="mb-2" />
                                                            <p className="fw-800 ls-wider opacity-90 mb-1" style={{ fontSize: '0.65rem' }}>{item.label}</p>
                                                            <p className="fw-900 mb-0 small">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: 48-Hour Forecast Preview */}
                                    <div className="col-lg-5">
                                        <div className="forecast-box h-100 p-4 shadow-xl">
                                            <h4 className="fw-900 mb-4 d-flex align-items-center gap-2 border-bottom border-white border-opacity-10 pb-3">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                                                Next 24-48 Hours
                                            </h4>

                                            {forecast && forecast.list ? (
                                                <div className="d-flex flex-column gap-3">
                                                    {forecast.list.slice(0, 6).map((item, idx) => (
                                                        <div key={idx} className="weather-card-item d-flex align-items-center justify-content-between p-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <span className="fw-900 small">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <FontAwesomeIcon
                                                                    icon={iconMap[getWeatherIcon(item.weather[0].main, item.weather[0].icon)] || faCloud}
                                                                    className="fs-4 opacity-100"
                                                                    style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}
                                                                />
                                                            </div>
                                                            <div className="text-end">
                                                                <span className="fw-900 fs-5">{formatTemperature(item.main.temp)}</span>
                                                                <p className="x-small text-capitalize fw-800 opacity-90 mb-0" style={{ fontSize: '0.8rem' }}>{item.weather[0].description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-5">
                                                    <LoadingSpinner />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Details */}
                                <div className="row g-4 mt-2 mb-5 pb-5">
                                    {[
                                        { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)}`, unit: 'km', progress: (weather.visibility / 10000) * 100, color: 'bg-primary' },
                                        { label: 'Cloud Coverage', value: weather.clouds.all, unit: '%', progress: weather.clouds.all, color: 'bg-info' }
                                    ].map((item, idx) => (
                                        <div className="col-md-4" key={idx}>
                                            <div className="main-glass-container p-4 border-0 h-100 shadow-lg" style={{ background: 'rgba(0,0,0,0.3) !important' }}>
                                                <p className="small text-uppercase ls-wider fw-900 mb-3 opacity-90">{item.label}</p>
                                                <h3 className="fw-900">{item.value} <span className="h5 opacity-50">{item.unit}</span></h3>
                                                <div className="progress mt-3" style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                                    <div className={`progress-bar ${item.color} shadow-lg`} style={{ width: `${item.progress}%`, borderRadius: '10px' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-md-4">
                                        <div className="main-glass-container p-4 border-0 h-100 shadow-lg" style={{ background: 'rgba(0,0,0,0.3) !important' }}>
                                            <p className="small text-uppercase ls-wider fw-900 mb-3 opacity-90">Daily Range</p>
                                            <div className="d-flex justify-content-between align-items-end mb-2">
                                                <h3 className="fw-900 mb-0">{formatTemperature(weather.main.temp_min)}</h3>
                                                <div className="flex-grow-1 mx-3 mb-2" style={{ height: '10px', background: 'linear-gradient(to right, #60a5fa, #f472b6)', borderRadius: '10px' }}></div>
                                                <h3 className="fw-900 mb-0">{formatTemperature(weather.main.temp_max)}</h3>
                                            </div>
                                            <div className="d-flex justify-content-between x-small fw-900 opacity-80">
                                                <span>MIN</span>
                                                <span>MAX</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;
