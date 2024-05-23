import React, { useEffect, useState } from 'react';
import "../App.css"
import Map from "./map/Map";

const Dashboard = () => {
    const [coords, setCoords] = useState({
        latitude: "",
        longitude: ""
    })

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

    useEffect(()=> {
        const locate = navigator.geolocation.getCurrentPosition(getLocation, error, options);
        console.log(locate);
    }, []);

    const getLocation = (postion) => {
        console.log(postion);
        setCoords({
            latitude: postion?.coords?.latitude,
            longitude: postion?.coords?.longitude,
        })
    }

    console.log(coords);
    const error = (err) => {
        if (
            err.code === 1 || //if user denied accessing the location
            err.code === 2 || //for any internal errors
            err.code === 3 //error due to timeout
        ) {     
        alert(err.message);
        } else {
        alert(err);
        }
    }
    return (
        <>
            <div>
                <Map coords={coords}/>
            </div>
        </>
    )
}

export default Dashboard;