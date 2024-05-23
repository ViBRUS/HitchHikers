import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "./marker";

const Map = ({ coords }) => {
    const { latitude, longitude } = coords;
    
    function MapView() {
        let map = useMap();
        map.setView([latitude, longitude], map.getZoom());
        //Sets geographical center and zoom for the view of the map
        return null;
    }
    return (
        <MapContainer center={[latitude, longitude]} zoom={10} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker position={[latitude, longitude]}>
                <Popup>
                    This is a popup
                </Popup>
            </CustomMarker>
            <MapView />
        </MapContainer>
    );
}

export default Map