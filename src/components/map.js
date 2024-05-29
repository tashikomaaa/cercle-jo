import React, { useRef, useState, useEffect } from "react";
import {
    MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const mapRef = useRef(null);

    const [userLocation, setUserLocation] = useState([48.866667, 2.333333]);
    useEffect(() => {
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    // update the value of userlocation variable
                    setUserLocation([latitude, longitude]);
                },
                // if there was an error getting the users location
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
        // if geolocation is not supported by the users browser
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])
    return (
        <div style={{ position: 'relative', height: '60vh' }}>
            <MapContainer center={userLocation} zoom={13} ref={mapRef} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={userLocation}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
