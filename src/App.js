import React from 'react';
import logo from './assets/images/logo/cerclejo.png';
import './App.css';
import MapComponent from './components/map';
import { useReactPWAInstall } from "react-pwa-install";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
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
            logo: logo,
            description: "",
        })
            .then(() => {
                alert(getMobileOperatingSystem())
            })
            .catch(() => { });
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
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
            <MapComponent />
            <a
                className="App-link"
                href="https://lecercle.community/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Vous est offert par la communauté du Cercle
            </a>
        </div>
    );
}

export default App;
