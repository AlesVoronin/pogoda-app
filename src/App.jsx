import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeather1, setCurrentWeather1] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  // const handleOnSearchChange1 = () => {
  //   const currentWeatherFetch1 = fetch(
  //     `${WEATHER_API_URL}/weather?lat=55.7558&lon=37.6173&appid=${WEATHER_API_KEY}&units=metric`
  //   );

  //   Promise.all([currentWeatherFetch1])
  //     .then(async (response) => {
  //       const weatherResponse = await response[0].json();
  //       setCurrentWeather1({
  //         city: "Moscow",
  //         ...weatherResponse,
  //       });
  //     })
  //     .catch(console.log);
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lm">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;
