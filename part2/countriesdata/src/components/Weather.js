import { useEffect, useState } from "react";
import countryService from "../services/country";

const Weather = ({ capital }) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  useEffect(() => {
    countryService.getCoordinate(capital).then((coordinate) => {
      countryService.getWeather(coordinate).then((wi) => setWeatherInfo(wi));
    });
  }, [capital]);

  if (Object.keys(weatherInfo).length === 0) {
    return <></>;
  }
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
};

export default Weather;
