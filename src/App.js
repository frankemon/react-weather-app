import React, { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./components/Forecast";
import MainWeather from "./components/MainWeather";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "4b78e001608c51616bf56aa09bcc30ec",
};

function App() {
  const userPosition = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const [lat, setLatitude] = useState(0);
  const [lon, setLongitude] = useState(0);

  const [cityName, setCityName] = useState("");

  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [timezone, setTimezone] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);

  const [icon, setIcon] = useState("");

  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);

  const [unit, setUnit] = useState("C");

  // Get weather data, using two APIs because "onecall" does not come with city name
  const getWeather = async () => {
    const unitType = unit === "C" ? "metric" : "imperial";
    try {
      await window.navigator.geolocation.getCurrentPosition(userPosition);
      const result = await axios.get(
        `${api.base}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${unitType}&appid=${api.key}`
      );
      setTemp(result.data.current.temp);
      setWeather(result.data.current.weather[0].main);
      setHumidity(result.data.current.humidity);
      setWind(result.data.current.wind_speed);
      setForecast(result.data.daily);
      setHourly(result.data.hourly);
      setSunrise(result.data.current.sunrise);
      setSunset(result.data.current.sunset);
      setIcon(result.data.current.weather[0].icon);
    } catch (err) {
      console.error(err);
    }
    try {
      await window.navigator.geolocation.getCurrentPosition(userPosition);
      const result2 = await axios.get(
        `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`
      );
      setCityName(result2.data.name);
      setTimezone(result2.data.timezone);
      setIcon(result2.data.weather[0].icon);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, [lat, lon, unit]);

  const getTodaysDate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // Separate forecast date using dt and similar logic to date builder above.
  const getForecastDate = (dt) => {
    let forecastDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let forecastDate = new Date(dt * 1000);
    let day = forecastDays[forecastDate.getDay()];
    let date = forecastDate.getDate();

    return `${day} ${date}th`;
  };

  // dt (unix time) converters
  const getSunrise = (sunrise) => {
    let dateObject = new Date((sunrise + timezone) * 1000);
    let hours = dateObject.getUTCHours().toString();
    let minutes = dateObject.getUTCMinutes().toString();
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`;
  };

  const getSunset = (sunset) => {
    let dateObject = new Date((sunset + timezone) * 1000);
    let hours = dateObject.getUTCHours().toString();
    let minutes = dateObject.getUTCMinutes().toString();
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`;
  };

  // Array containing dourly forecasts, sliced and filtered to output every 3rd hour over span of 24 hours
  let everyThirdHour = hourly.slice(1, 25).filter((_, i) => i % 3 === 0);

  // Handling degree/unit conversion to update temp from C -> F
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div className="App bg-blue-300 lg:flex lg:justify-center">
      <main>
        <div>
          <select
            className="cursor-pointer bg-yellow-500 rounded-lg p-1 shadow-lg"
            onChange={handleUnitChange}
          >
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
        </div>
        <div className="current-hourly-container">
          <MainWeather
            currentCity={cityName}
            currentDate={getTodaysDate}
            currentTemp={temp}
            currentunit={unit}
            currentIcon={icon}
            currentWeather={weather}
            currentGetSunrise={getSunrise}
            currentSunrise={sunrise}
            currentGetSunset={getSunset}
            currentSunset={sunset}
            currentWind={wind}
            currentHumidty={humidity}
            everyThirdHour={everyThirdHour}
            hourlyDate={getForecastDate}
            hourlySunrise={getSunrise}
            hourlyunit={unit}
          />
        </div>
        <div className="forecast-container">
          <Forecast
            forecast={forecast}
            forecastDate={getForecastDate}
            forecastSunrise={getSunrise}
            forecastSunset={getSunset}
            forecastunit={unit}
          />
        </div>
      </main>
    </div>
  );
}
export default App;
