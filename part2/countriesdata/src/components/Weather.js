import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const Weather = ({ capital }) => {
  const [coordinate, setCoordinate] = useState({ lat: 0, lon: 0 });
  const [weatherInfo, setWeatherInfo] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`
      )
      .then((res) => {
        const newCoordinate = {
          lat: res.data[0].lat,
          lon: res.data[0].lon,
        };
        setCoordinate(newCoordinate);
      });
  }, [capital]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}`
      )
      .then((res) => {
        setWeatherInfo(res.data);
      });
  }, [coordinate]);

  if (Object.keys(weatherInfo).length === 0) {
    return <></>;
  } else {
    return (
      <>
        <h3>Weather in {capital}</h3>
        <p>temperature {weatherInfo.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={weatherInfo.weather[0].description}
        ></img>
        <p>wind {weatherInfo.wind.speed} m/s</p>
      </>
    );
  }
};

export default Weather;
