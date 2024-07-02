import React, { useEffect, useState } from "react";
import axios from 'axios';
import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2
  });
  
  const [name, setName] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1240f8bbd692f924a6f2aba0539841f1&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed
          });
        })
        .catch(error => console.log(error));
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
        <div className="winfo">
          <img className="clouds" src="/images/clouds.png" alt="Clouds" />
          <h1>{Math.round(data.celcius)} °C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="Humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}</p>
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
