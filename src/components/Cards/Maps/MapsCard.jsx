import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icons from '../../../assets/icons'; 
import "leaflet/dist/leaflet.css";

// Default marker icon for Leaflet


const Map = ({ location, places }) => {
  if (!location || !location.latitude || !location.longitude) {
    return (
      <div className="text-center text-gray-600 p-6">
        <h2 className="text-2xl font-bold mb-4">Map</h2>
        <p>Location not available. Please enable location access.</p>
      </div>
    );
  }

  return (
    <section className="  p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-[#fff] mb-6">Nearby Locations</h2>
      <div className="w-full h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Map tiles */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Current location marker */}
          <Marker position={[location.latitude, location.longitude]} icon={icons.currentLocation}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>

          {/* Marqueurs pour les lieux */}
          {places.map((place, index) => (
            <Marker
              key={index}
              position={[place.lat, place.lon]}
              icon={icons[place.type.toLowerCase()] || icons.default} 
            >
              <Popup>
                <strong>{place.name}</strong> <br />
                {place.type} <br />
                {place.description} <br />
                <strong>Distance :</strong> {place.distance || 'Distance non calculée'}
              </Popup>
            </Marker>
            ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;
