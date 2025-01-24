import React, { useEffect, useState } from "react";
import useWeather from "../../hooks/useWeather.js";
import usePlaces from "../../hooks/usePlaces.js";
import WeatherCard from "../Cards/Weather/WeatherCard.jsx";
import SuggestionCard from "../Cards/Suggestion/SuggestionCard.jsx";
import Map from "../Cards/Maps/MapsCard.jsx";
import MenuDarkLight from "../../assets/MenuDarkLight";
import BottomMenu from "../../assets/BottomMenu.jsx";
import "../../global.css";

const HomeCard = () => {
  const [location, setLocation] = useState(null);
  const [currentHour, setCurrentHour] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { weather, fetchWeather } = useWeather();
  const { places, groupedPlaces, fetchPlacesFromOpenAI, fetchPlacesFromOverpass } = usePlaces();

  useEffect(() => {
    const hour = new Date().getHours();
    setCurrentHour(hour);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
          await fetchWeather(latitude, longitude);
          await fetchPlacesFromOverpass(latitude, longitude);
        },
        () => {
          setLocation(null);
        }
      );
    }
  }, [fetchWeather, fetchPlacesFromOverpass]);

  useEffect(() => {
    if (weather && location) {
      fetchPlacesFromOpenAI(weather);
    }
  }, [weather, location, fetchPlacesFromOpenAI]);

  if (!location) return <div className="loader">Loading...</div>;
  if (!groupedPlaces) return <div className="loader">Loading places...</div>;

  const getBackgroundGradient = () => {
    if (!weather) return "from-gray-500 to-gray-700";
    switch (weather.description.toLowerCase()) {
      case "clear sky":
        return "from-blue-400 to-blue-600";
      case "few clouds":
        return "from-blue-300 to-gray-400";
      case "scattered clouds":
      case "overcast clouds":
        return "from-gray-400 to-gray-600";
      case "rain":
      case "light rain":
        return "from-blue-700 to-gray-800";
      case "thunderstorm":
        return "from-gray-800 to-black";
      case "snow":
        return "from-white to-blue-200";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br ${getBackgroundGradient()} ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Header Section */}
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-md">
  {/* App Title */}
  <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white tracking-wide">
    Local Explorer
  </h4>
  
  {/* Dark Mode Toggle */}
  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </span>
    <MenuDarkLight isDarkMode={isDarkMode} />
  </button>
</div>


        {/* Weather Section */}
        <div id="weather-section" className="my-4">
          <WeatherCard weather={{ ...weather, hour: currentHour }} />
        </div>

        {/* Suggestions Section */}
        <div id="suggestions-section" className="my-4">
          <SuggestionCard groupedPlaces={groupedPlaces || {}} />
        </div>

        {/* Map Section */}
        <div id="map-section" className="my-4 relative z-0">
          <Map location={location} places={places} />
        </div>
      </div>

      {/* Bottom Menu */}
      <BottomMenu isDarkMode={isDarkMode} />
      </div>
  );
};

export default HomeCard;
