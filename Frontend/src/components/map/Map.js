import React, {useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faRoute } from '@fortawesome/free-solid-svg-icons';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import RoutingMachine from './RoutingMachine';
// import CustomMarker from "./Marker";
import SearchComponent from "../SearchComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRoute } from '@fortawesome/free-solid-svg-icons';

const Map = () => {
    const [locationMarkers, setLocationMarkers] = useState([]);
    const [showFormView, setShowFormView] = useState(false);
    const [selectedFromOption, setSelectedFromOption] = useState('')
    const [selectedToOption, setSelectedToOption] = useState('')

    // useEffect(() => { }, [waypoints]);

    const waypoints = [
        // {
        //     latitude: 24.44667,
        //     longitude: 86.70667,
        // },
        // {
        //     latitude: 46.86223,
        //     longitude: 1.73056,
        // },
    ]

    const handleFromOptionSelect = (opt) => {
        console.log(opt);
        setSelectedFromOption(opt);
    }
    const handleToOptionSelect = (opt) => {
        console.log(opt);
        setSelectedToOption(opt);
    }

    async function handleRouteSubmit(event) {
        event.preventDefault()
        console.log(event);
    }

    return (
        <>
            <div className="routeBlock">
                <div className="addRoutes">
                    {showFormView && (
                        <form onSubmit={handleRouteSubmit}>
                            <SearchComponent typeProp="text" placeholderProp="From..." onOptionSelect={handleFromOptionSelect} />
                            <SearchComponent typeProp="text" placeholderProp="To..." onOptionSelect={handleToOptionSelect} />

                            <div className="posOne">
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="Airplane Type"
                                />
                            </div>

                            <div className="posTwo">
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="Departure Time"
                                />
                            </div>
                            <div className="posTwo">
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    placeholder="Weight"
                                />
                            </div>
                            <button className="addloc">Route</button>
                        </form>
                    )}
                    <FontAwesomeIcon
                        icon={faRoute}
                        style={{ color: '#1EE2C7' }}
                        onClick={() => {
                            setShowFormView((showFormView) => !showFormView);
                        }}
                    />
                </div>
            </div>
            <MapContainer center={[31.505, 70.09]} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {waypoints ? <RoutingMachine waypoints={waypoints} /> : ''}
            </MapContainer>
        </>
    );
}

export default Map