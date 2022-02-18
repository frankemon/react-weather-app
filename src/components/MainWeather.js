import React from "react";

const MainWeather = ({
  currentCity,
  currentDate,
  currentTemp,
  currentunit,
  currentIcon,
  currentWeather,
  currentGetSunrise,
  currentSunrise,
  currentGetSunset,
  currentSunset,
  currentWind,
  currentHumidty,
  everyThirdHour,
  hourlyDate,
  hourlySunrise,
  hourlyunit,
}) => {
  return (
    <div>
      <div className="location-wrapper text-center bg-blue-300 space-y-5 my-2 border border-blue-300 rounded-lg shadow-xl">
        <h3 className="text-3xl">Current weather in {currentCity}:</h3>
        <div className="date font-bold">{currentDate(new Date())}</div>
        <div className="weather-wrapper bg-blue-300 flex flex-col justify-center p-2 rounded-lg shadow-xl lg:mx-96 lg:p-12">
          <div className="temp text-3xl">
            {Math.round(currentTemp)}°{currentunit}
          </div>
          <div className="icon flex justify-center">
            <img
              src={`http://openweathermap.org/img/wn/${currentIcon}.png`}
              alt=""
            ></img>
          </div>
          <div className="weather text-3xl">{currentWeather}</div>
        </div>
        <div className="current-details-wrapper grid grid-cols-4 grid-rows-1 lg:flex lg:justify-evenly">
          <div className="detail-item">
            <p className="font-bold">Sunrise:</p>
            {currentGetSunrise(currentSunrise)}
          </div>
          <div className="detail-item">
            <p className="font-bold">Sunset:</p>
            {currentGetSunset(currentSunset)}
          </div>
          <div className="detail-item">
            <p className="font-bold">Wind:</p>
            {Math.round(currentWind)} m/s
          </div>
          <div className="detail-item">
            <p className="font-bold">Humidity:</p>
            {currentHumidty} %
          </div>
        </div>
        <h3 className="text-3xl">Weather in the next 24 hours: </h3>
        <div className="hourly-wrapper grid grid-cols-2 grid-row-1 space-x-1 text-center my-2 lg:grid-cols-8">
          {everyThirdHour.map((hourly) => (
            <div
              key={hourly.dt}
              className="hourly-card flex flex-col space-y-3 my-2 p-2 border-l border-r rounded-lg border-blue-300 shadow-xl"
            >
              <div className="font-bold">{hourlyDate(hourly.dt)}</div>
              <div className="font-bold">{hourlySunrise(hourly.dt)}</div>
              <div className="lg:text-xl">
                {Math.round(hourly.temp)}°{hourlyunit}
              </div>
              <div className="forecastIcon flex justify-center">
                <img
                  src={`http://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`}
                  alt=""
                ></img>
              </div>
              <div className="forecastWeather lg:text-xl">
                {hourly.weather[0].main}
              </div>
              <div className="grid-container space-y-3">
                <div className="detail-item">
                  <p>Wind:</p>
                  {Math.round(hourly.wind_speed)} m/s
                </div>
                <div className="detail-item">
                  <p>Humidity:</p>
                  {hourly.humidity} %
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
