import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: '6c1ddbe1cdbe4ff3b73124550242403',
          q: city,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
