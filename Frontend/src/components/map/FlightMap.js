import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const FlightMap = () => {
    const routeCoordinates = [
        {
            latitude: 24.44667,
            longitude: 86.70667,
        },
        {
            latitude: 46.86223,
            longitude: 1.73056,
        },
    ]
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={routeCoordinates} color="blue" />
    </MapContainer>
  );
};

export default FlightMap;
