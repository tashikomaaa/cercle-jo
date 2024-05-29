import React, { useRef } from "react";
import {
    MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import "leaflet/dist/leaflet.css";


import ButtonComponent from "./button";

const MapComponent = () => {
    const mapRef = useRef(null);
    const position = [48.866667, 2.333333];




    return (
        <div>
            <div style={{ position: 'relative', height: '65vh', width: '100vw' }}>
                <MapContainer center={position} zoom={13} ref={mapRef} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div>
                <ButtonComponent />
            </div>
        </div>
    );
};

export default MapComponent;
