import axios from "axios";

const countryInfoUrl = "https://restcountries.com/v3.1/name";
const weatherBaseUrl = "http://api.openweathermap.org";
const apiKey = process.env.REACT_APP_API_KEY;

const getCountry = (country) => {
  const request = axios.get(`${countryInfoUrl}/${country}`);
  return request.then((res) => res.data);
};

const getCoordinate = (capital) => {
  const request = axios.get(
    `${weatherBaseUrl}/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`
  );
  return request.then((res) => res.data[0]);
};

const getWeather = (coordinate) => {
  const request = axios.get(
    `${weatherBaseUrl}/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}`
  );
  return request.then((res) => res.data);
};

const countryService = { getCountry, getCoordinate, getWeather };

export default countryService;
