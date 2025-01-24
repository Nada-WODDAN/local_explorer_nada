import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const currentHour = new Date().getHours();

  const getMomentOfTheDay = () => {
    if (currentHour >= 5 && currentHour < 12) return "Morning";
    if (currentHour >= 12 && currentHour < 17) return "Afternoon";
    if (currentHour >= 17 && currentHour < 21) return "Evening";
    return "Night";
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card max-w-sm w-full bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">Weather Update</h2>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{weather.city || "Unknown Location"}</h3>
            <p className="text-sm text-gray-200">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-gray-200">
              Time: {currentHour}:{new Date().getMinutes().toString().padStart(2, "0")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{weather.temperature}°</p>
            <p className="text-sm capitalize">{weather.description}</p>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <img
            className="h-20 w-20"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              className="fill-current text-gray-200"
            >
              <path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path>
              <path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path>
            </svg>
            <span>{weather.wind_speed} km/h</span>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              className="fill-current text-gray-200"
            >
              <path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path>
              <path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path>
            </svg>
            <span>{weather.humidity}%</span>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-200">
              Feels Like: {weather.feels_like}°C
            </p>
          </div>

          {/* Moment of the Day */}
          <div className="col-span-2 mt-4 text-center">
            <p className="text-sm">
              Moment of the Day: <span className="font-semibold">{getMomentOfTheDay()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
