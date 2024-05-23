// custom-marker.tsx

import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MakrerUrl from "../../assets/mapMarker.png";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const CustomMarker = ({ position, children }) => {
//   const map = useMap();

  const customIcon = L.icon({
    iconUrl: MakrerUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;