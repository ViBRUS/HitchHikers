import React, { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faRoute } from '@fortawesome/free-solid-svg-icons';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import RoutingMachine from './RoutingMachine';
import CustomMarker from "./Marker";

const Map = () => {
    const [locationMarkers, setLocationMarkers] = useState([]);
    // const [waypoints, setWaypoints] = useState();
    const [showRoutingForm, setFormView] = useState(false);

    // useEffect(() => { }, [waypoints]);

    const waypoints = [
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
        <>
            <MapContainer center={[31.505, 70.09]} zoom={8} scrollWheelZoom={true}>
                {/* <Marker position={[31.505, 70.09]}>
                    <Popup>
                        this is popup
                    </Popup>
                </Marker> */}

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {waypoints ? <RoutingMachine waypoints={waypoints} /> : ''}

                {/* <CustomMarker position={[latitude, longitude]}>
                    <Popup>
                        This is a popup
                    </Popup>
                </CustomMarker>
                <MapView /> */}
            </MapContainer>
        </>
    );
}

export default Map