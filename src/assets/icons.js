import L from 'leaflet';

// Définir une icône personnalisée
const createCustomIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [50, 50], // Taille de l'icône
    iconAnchor: [12, 41], // Point d'ancrage
    popupAnchor: [1, -34], // Position de la popup
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

// Différents types d'icônes
const icons = {
  restaurant: createCustomIcon('https://cdn-icons-png.flaticon.com/512/3523/3523063.png'),
  cafe: createCustomIcon('https://cdn-icons-png.flaticon.com/512/3068/3068651.png'),
  attraction: createCustomIcon('https://cdn-icons-png.flaticon.com/512/888/888001.png'),
  museum: createCustomIcon('https://cdn-icons-png.flaticon.com/512/1038/1038108.png'),
  default: createCustomIcon('https://cdn-icons-png.flaticon.com/512/854/854878.png'), // Icône par défaut
  
  // Icône personnalisée pour la position actuelle
  currentLocation: createCustomIcon('https://cdn-icons-png.flaticon.com/512/684/684908.png'), // Remplacer par votre icône
};

export default icons;
