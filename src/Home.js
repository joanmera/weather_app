import React, { useState, useEffect } from "react";
import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: null,
    name: '',
    humidity: null,
    speed: null,
    image: ''
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const fetchWeather = (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1240f8bbd692f924a6f2aba0539841f1&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ciudad invalida');
        }
        return response.json();
      })
      .then(res => {
        console.log(res); // Verificar que res contiene los datos esperados
        let imagePath = '';
        switch (res.weather[0].main) {
          case "Clouds":
            imagePath = '/images/clouds.png';
            break;
          case "Clear":
            imagePath = '/images/clear.png';
            break;
          case "Rain":
            imagePath = '/images/rain.png';
            break;
          case "Drizzle":
            imagePath = '/images/drizzle.png';
            break;
          case "Mist":
            imagePath = '/images/mist.png';
            break;
          default:
            imagePath = '/images/clouds.png';
            break;
        }

        setData({
          celcius: res.main.temp,
          name: res.name,
          humidity: res.main.humidity,
          speed: res.wind.speed,
          image: imagePath
        });
        setError('');
      })
      .catch(err => {
        setError(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWeather('London');
  }, []);

  const handleClick = () => {
    if (name !== "") {
      fetchWeather(name);
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input 
            type="text" 
            placeholder="Ingresa el nombre de la ciudad" 
            onChange={e => setName(e.target.value)} 
          />
          <button onClick={handleClick}>
            <img src="/images/search.png" alt="Buscar" />
          </button>
        </div>
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        <div className="winfo">
          <img className="clouds" src={data.image} alt="Weather" />
          <h1>{Math.round(data.celcius)} °C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="Humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humedad</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="Wind" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Viento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
