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
import Countdown from './components/countdown'
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

    return (
        <div className="App">
            <Box>
                <header className="App-header">
                    <div style={{ display: 'flex' }}>
                        <img src={logo} className="App-logo" alt="logo" />
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
                <Countdown timeTillDate="07 26 2024, 6:00 am" timeFormat="MM DD YYYY, h:mm a" />
                <MapComponent />
                <ButtonComponent />
            </Box>
        </div>
    );
}

export default App;