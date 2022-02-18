import React from "react";

const Forecast = ({
  forecast,
  forecastDate,
  forecastSunrise,
  forecastSunset,
  forecastunit,
}) => {
  return (
    <div>
      <h3 className="text-3xl text-center">Weather this week:</h3>
      <div className="forecast-wrapper grid grid-cols-2 grid-row-1 space-x-1 text-center my-2 p-2 lg:grid-cols-8">
        {forecast.map((daily) => (
          <div
            key={daily.dt}
            className="forecast-card space-y-3 my-2 p-2 border-l border-r border-blue-300 shadow-xl rounded-lg"
          >
            <div className="date font-bold">{forecastDate(daily.dt)}</div>
            <div className="forecastTemp text-xl">
              {Math.round(daily.temp.day)}°{forecastunit}
            </div>
            <div className="forecastIcon flex justify-center">
              <img
                src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}.png`}
                alt=""
              ></img>
            </div>
            <div className="forecastWeather text-xl">
              {daily.weather[0].main}
            </div>
            <div className="forecast-details space-y-3">
              <div className="grid-item">
                <p>Sunrise:</p>
                {forecastSunrise(daily.sunrise)}
              </div>
              <div className="grid-item">
                <p>Sunset:</p>
                {forecastSunset(daily.sunset)}
              </div>
              <div className="grid-item">
                <p>Wind:</p>
                {Math.round(daily.wind_speed)} m/s
              </div>
              <div className="grid-item">
                <p>Humidity:</p>
                {daily.humidity} %
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
