import React, { useState } from 'react';
import Navbar from './Navbar';
import Map from './map/Map';
import FlightMap from './map/FlightMap';

const Home = () => {

  return (
    <>
        <Navbar />
        <Map />
        {/* <FlightMap /> */}
    </>
  );
}

export default Home;