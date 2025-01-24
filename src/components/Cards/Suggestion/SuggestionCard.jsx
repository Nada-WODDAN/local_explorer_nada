import React from "react";

const SuggestionCard = ({ groupedPlaces }) => {
  if (!groupedPlaces) {
    return <p className="text-center text-gray-600">No places found.</p>;
  }

  const validPlaces = Object.values(groupedPlaces)
    .flat()
    .filter(
      (place) =>
        place.name &&
        place.name.trim() !== "" &&
        place.description &&
        place.description.trim() !== "" &&
        place.distance
    )
    .slice(0, 4);

  console.log("Grouped Places:", groupedPlaces);
  console.log("Valid Places:", validPlaces);

  if (validPlaces.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No valid places found.</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800  dark:text-[#fff]">Top Suggestions</h3>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validPlaces.map((place, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-600"
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white ">
                {index + 1}. {place.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{place.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Distance: <span className="font-medium">{place.distance}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
