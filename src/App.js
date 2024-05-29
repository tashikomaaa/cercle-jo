import React from 'react';
import logo from './assets/images/logo/logo.png';
import './App.css';
import MapComponent from './components/map';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <MapComponent />
                <a
                    className="App-link"
                    href="https://lecercle.community/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vous est offert par la communauté du Cercle
                </a>
            </header>
        </div>
    );
}

export default App;
