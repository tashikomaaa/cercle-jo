import React, { useRef, useState, useEffect, useContext } from "react";
import { PositionContext } from '../core/context/PositionContext';
import {
    MapContainer, TileLayer, Marker, Popup, Circle
} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { listCoords } from "../core";

const MapComponent = () => {
    const mapRef = useRef(null);
    const { setPosition } = useContext(PositionContext);
    const [userLocation, setUserLocation] = useState([48.866667, 2.333333]);
    const [coords, setCoords] = useState([]);

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                await listCoords().then(function (response) {
                    // handle success
                    setCoords(response.data.result);
                })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            } catch (error) {
                console.error('Erreur lors de la récupération des coordonnées:', error);
            }
        };
        fetchCoords();
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    // update the value of userlocation variable
                    setUserLocation([latitude, longitude]);
                    setPosition([latitude, longitude]);
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
        const intervalId = setInterval(fetchCoords, 10000); // Mettre à jour toutes les 10 secondes

        return () => clearInterval(intervalId); // Nettoyer l'intervalle lorsque le composant est démonté
    }, [])
    function addCircle(lat, lng, index) {
        return (
            <Circle
                key={`${lat}-${lng}-${index}`}
                center={[lat, lng]}
                radius={500}
                color="red"
            />
        );
    }
    return (
        <div style={{ position: 'relative', height: '80vh' }}>
            <MapContainer center={userLocation} zoom={13} ref={mapRef} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coords.map((coord, index) => (
                    addCircle(coord.latitude, coord.longitude, index)
                ))}
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
