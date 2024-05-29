import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    const mapRef = useRef(null);
    const [coords, setCoords] = useState([]);
    const [userLocation, setUserLocation] = useState([48.866667, 2.333333]);

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const response = await axios.get('https://api.cercle-jo.app/coords');
                setCoords(response.data.result);
            } catch (error) {
                console.error('Erreur lors de la récupération des coordonnées:', error);
            }
        };

        fetchCoords();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        const intervalId = setInterval(fetchCoords, 10000); // Mettre à jour toutes les 10 secondes

        return () => clearInterval(intervalId); // Nettoyer l'intervalle lorsque le composant est démonté
    }, []);

    function addCircle(lat, lng) {
        return (
            <Circle
                key={`${lat}-${lng}`}
                center={[lat, lng]}
                radius={500}
                color="red"
            />
        );
    }

    return (
        <div>
            <div style={{ position: 'relative', height: '65vh', width: '100vw' }}>
                <MapContainer center={userLocation} zoom={13} ref={mapRef} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {coords.map(coord => (
                        addCircle(coord.latitude, coord.longitude)
                    ))}
                    <Marker position={userLocation}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
