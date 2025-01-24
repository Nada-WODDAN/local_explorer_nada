import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Weather Icon
import LightbulbIcon from "@mui/icons-material/Lightbulb"; // Suggestions Icon
import MapIcon from "@mui/icons-material/Map"; // Map Icon

const BottomMenu = ({ isDarkMode }) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-around items-center w-3/4 max-w-md py-2 rounded-lg shadow-lg z-50 border 
        ${isDarkMode ? "bg-transparent border-white" : "bg-black border-white"}`}
    >
      {/* Weather Button */}
      <button
        className={`flex flex-col items-center ${
          isDarkMode ? "text-black" : "text-white"
        }`}
        onClick={() => scrollToSection("weather-section")}
      >
        <WbSunnyIcon fontSize="medium" className="dark:text-white" />
        <span className="text-xs mt-1 dark:text-white ">Weather</span>
      </button>

      {/* Suggestions Button */}
      <button
        className={`flex flex-col items-center ${
          isDarkMode ? "text-black" : "text-white"
        }`}
        onClick={() => scrollToSection("suggestions-section")}
      >
    <LightbulbIcon fontSize="inherit" className="text-xl dark:text-white" />

        <span className="text-xs mt-1 dark:text-white">Suggestions</span>
      </button>

      {/* Map Button */}
      <button
        className={`flex flex-col items-center ${
          isDarkMode ? "text-black" : "text-white"
        }`}
        onClick={() => scrollToSection("map-section")}
      >
        <MapIcon fontSize="medium" className="dark:text-white"  />
        <span className="text-xs mt-1 dark:text-white">Map</span>
      </button>
    </div>
  );
};

export default BottomMenu;
