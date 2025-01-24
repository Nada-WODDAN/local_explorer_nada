import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [groupedPlaces, setGroupedPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY_OPENAI = process.env.REACT_APP_OPENAI_API_KEY;
  const OVERPASS_RADIUS = 200;
  const [currentLocation, setCurrentLocation] = useState(null); 

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning'; 
    if (hour >= 12 && hour < 20) return 'afternoon'; 
    return 'evening'; // Soir
  };

  const normalizeType = (type) => type.toLowerCase();

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Erreur de localisation : ', err);
        setError('Impossible de récupérer la localisation actuelle.');
      }
    );
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPlacesFromOpenAI = useCallback(
    async (weatherData) => {
      try {
        const timeOfDay = getTimeOfDay();

        const prompt = `
          Vous êtes un assistant qui propose des lieux intéressants à visiter en fonction du moment de la journée.
          Localisation : ${weatherData.city}.
          Conditions météo : ${weatherData.description}, ${weatherData.temperature}°C.
          C'est actuellement le ${timeOfDay}. 
          Suggérez des lieux à visiter dans un rayon de 500 mètre autour de la localisation actuelle et, condition météo et le moment de la journée.
          
          Le matin, privilégiez les lieux comme les monuments, les jardins, les parcs et les cafés.
          L'après-midi, privilégiez les attractions touristiques, les musées, les restaurants et les parcs.
          Le soir, proposez des cafés et des restaurants.
          Fournissez les informations suivantes pour chaque lieu en anglais : nom, type, description brève, latitude, longitude .
          Exemple : 
          Café de la Poste, Coffee ,"Charming coffee with a cozy atmosphere to enjoy a hot drink", 48.700476, 2.183694.`; 

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 300,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY_OPENAI}`,
            },
          }
        );

        const suggestions = response.data.choices[0].message.content
          .trim()
          .split('\n')
          .map((item) => {
            const [name, type, description, lat, lon] = item.split(',');
            const place = {
              name: name.trim(),
              type: normalizeType(type.trim()),
              description: description ? description.trim() : 'No description available.',
              lat: parseFloat(lat.trim()),
              lon: parseFloat(lon.trim()),
            };

            if (currentLocation) {
              const distance = calculateDistance(
                currentLocation.lat,
                currentLocation.lon,
                place.lat,
                place.lon
              );
              place.distance = `${distance.toFixed(2)} m`;
            } else {
              place.distance = 'Distance inconnue';
            }

            return place;
          });

        const nearbyPlaces = suggestions.filter(
          (place) => place.distance !== 'Distance inconnue' && parseFloat(place.distance) <= 500
        );

        setPlaces((prevPlaces) => {
          const allPlaces = [...prevPlaces, ...nearbyPlaces];
          const uniquePlaces = Array.from(
            new Map(allPlaces.map((place) => [`${place.lat},${place.lon}`, place])).values()
          );
          return uniquePlaces.slice(0, 5); // Limiter à 5 lieux
        });
      } catch (err) {
        setError('Erreur lors de la récupération des lieux via OpenAI.');
      } finally {
        setLoading(false);
      }
    },
    
  );

  const fetchPlacesFromOverpass = useCallback(
    async (lat, lon) => {
      try {
        const query = `
          [out:json];
          node[tourism~"museum|attraction"](around:${OVERPASS_RADIUS},${lat},${lon});
          node[amenity~"restaurant|cafe"](around:${OVERPASS_RADIUS},${lat},${lon});
          out;
        `;
        const response = await axios.get(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const overpassPlaces = response.data.elements.map((element) => {
          const place = {
            name: element.tags.name ,
            type: normalizeType(element.tags.tourism || element.tags.amenity || 'Inconnu'),
            description: element.tags.description || 'No description available.',
            lat: element.lat,
            lon: element.lon,
          };

          if (currentLocation) {
            const distance = calculateDistance(
              currentLocation.lat,
              currentLocation.lon,
              place.lat,
              place.lon
            );
            place.distance = `${distance.toFixed(2)} m`;
          } else {
            place.distance = 'Distance inconnue';
          }

          return place;
        });

        // Filtrer les lieux à moins de 200 mètres
        const nearbyPlaces = overpassPlaces.filter(
          (place) => place.distance !== 'Distance inconnue' && parseFloat(place.distance) <= 500
        );

        setPlaces((prevPlaces) => {
          const allPlaces = [...prevPlaces, ...nearbyPlaces];
          const uniquePlaces = allPlaces.filter(
            (place, index, self) =>
              index === self.findIndex((p) => p.lat === place.lat && p.lon === place.lon)
          );
          return uniquePlaces.slice(0, 5); // Limiter à 5 lieux
        });
      } catch (err) {
        setError('Erreur lors de la récupération des lieux via Overpass.');
      } finally {
        setLoading(false);
      }
    },
    [currentLocation]
  );

  useEffect(() => {
    if (places.length > 0) {
      const grouped = places.reduce((acc, place) => {
        const normalizedType = normalizeType(place.type);
        if (!acc[normalizedType]) {
          acc[normalizedType] = [];
        }
        acc[normalizedType].push(place);
        return acc;
      }, {});
      setGroupedPlaces(grouped);
    }
  }, [places]);

  return { places, groupedPlaces, fetchPlacesFromOpenAI, fetchPlacesFromOverpass, loading, error };
};

export default usePlaces;
