import React, { useRef } from "react";
import {
    MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
//https://medium.com/@timndichu/getting-started-with-leaflet-js-and-react-rendering-a-simple-map-ef9ee0498202

const MapComponent = () => {
    const mapRef = useRef(null);
    const position = [48.866667, 2.333333]

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={position} zoom={13} ref={mapRef} style={{ height: "50vh", width: "100vw" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Icon marker ne s'affiche pas, pourquoi?  */}
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;