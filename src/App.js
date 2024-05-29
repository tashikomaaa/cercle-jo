import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import GoogleMapReact from 'google-maps-react';
import './App.css';


const API_KEY = process.env.API_KEY;



function App() {
  const [userPosition, setUserPosition] = useState(null);
  const [signalPosition, setSignalPosition] = useState(null);

  useEffect(() => {
    // Get user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user position:', error);
      }
    );
  }, []);

  const handleSignalClick = () => {
    setSignalPosition(userPosition);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


        <GoogleMapReact
          google={window.google}
          bootstrapURLKeys={API_KEY}
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={userPosition}
          zoom={15}
        > 

          {signalPosition && (
            <GoogleMapReact.Marker position={signalPosition} icon={{ url: '/signal.png' }}>
            </GoogleMapReact.Marker>
          )}
        </GoogleMapReact>

      <button onClick={handleSignalClick} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        Signal Activity
      </button>
    </div>
  );
}

export default App