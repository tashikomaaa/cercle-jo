import React from 'react';
import logo from './assets/images/logo/cerclejo.png';
import littleLogo from './assets/images/logo/littlecercle.png';
import './App.css';
import Box from '@mui/material/Box';
import MapComponent from './components/map';
import ButtonComponent from './components/button';
import { useReactPWAInstall } from "react-pwa-install";
import Button from '@mui/material/Button';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
function App() {
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
            return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }
    const handleClick = () => {
        pwaInstall({
            title: "Installer Le Cercle-JO",
            logo: littleLogo,
            description: "",
        })
            .then(() => {
                alert(getMobileOperatingSystem())
            })
            .catch(() => { });
    };

    

    return process.env.OPEN ? (
        <div className="App">
            <Box>
                <header className="App-header">
                    <div style={{ display: 'flex' }}>

                        {supported() && !isInstalled() && (
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                onClick={handleClick}
                                startIcon={<BrowserUpdatedIcon />}
                            >
                                Installer l'application
                            </Button>
                        )}
                    </div>
                </header>
                <MapComponent />
                <ButtonComponent />
            </Box>
        </div>
    ) : (
        <main>
            <ul class="game-cards">
                <li>
                    <div class="game-card">
                        <div class="game-card__front">
                            <div class="game-card__header">
                                <div class="game-card__cover">
                                    <div class="game-card__image-placeholder">
                                        <img src={logo} id="logo" alt="logo" />
                                    </div>
                                    <span class="game-card__cover-badge new" aria-hiddden="true">New</span>
                                </div>
                                <div class="game-card__title">Cercle-JO</div>
                                <button class="game-card__touch-target" aria-label="expand"></button>
                            </div>
                        </div>

                        <div class="game-card__back">
                            <div class="game-card__content">
                                <div class="game-card__metadata">
                                    <i class="fa fa-clock" aria-hidden="true"></i>
                                    Ouverture le 26 Juillet 2024
                                </div>
                                <div class="game-card__buttons">
                                    {supported() && !isInstalled() && (
                                        <button className="game-card__button -download" onClick={handleClick}>
                                            <i className="fa fa-download" aria-hidden="true"></i>
                                            Installer
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
    )
}

export default App;