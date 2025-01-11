// script.js

// Initialize the map and set its view to a default location
var map = L.map('map').setView([35.731,-100.1796], 4); // Albuquerque as original center

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define custom icons with direct links to PNG icons
const dumpsterFireIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/11230/11230334.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30]
});

const sunsetIcon = L.icon({
    iconUrl: 'sunset.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30]
});

const babyIcon = L.icon({
    iconUrl: 'baby.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30]
});

const dollarSignIcon = L.icon({
    iconUrl: 'money.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30]
});

const homeSignIcon = L.icon({
    iconUrl: 'house.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30]
});

// Load the GeoJSON data from the local file
fetch('locations.geojson?nocache=' + Date.now())
  .then(response => response.json())
  .then(data => {
      // Add the GeoJSON layer to the map with custom icons and popups
      L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
              let icon;
              switch (feature.properties.name) {
                  case "Albuquerque, NM":
                      icon = babyIcon;
                      break;
                  case "Pullman, WA":
                      icon = dumpsterFireIcon;
                      break;
                  case "Fargo, ND":
                      icon = dollarSignIcon;
                      break;
                  case "Caye Caulker, Belize":
                      icon = sunsetIcon;
                      break;
                  default:
                      icon = homeSignIcon;
              }
              return L.marker(latlng, { icon: icon });
          },
          onEachFeature: function (feature, layer) {
              if (feature.properties && feature.properties.name) {
                  layer.bindPopup(
                      "<b>" + feature.properties.name + "</b><br>" +
                      feature.properties.description
                  );
              }
          }
      }).addTo(map);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));
