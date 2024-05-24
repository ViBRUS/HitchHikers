import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const createRoutineMachineLayer = ({ waypoints }) => {
  const instance = L.Routing.control({
    waypoints: waypoints.map(({ latitude, longitude }) =>{
      console.log(latitude, longitude)
      return L.latLng(latitude, longitude)
  }),
    draggableWaypoints: true,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;