import React from 'react';
import logo from './assets/images/logo/logo.png';
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

    const handleClick = () => {
        pwaInstall({
            title: "Installer Le Cercle-JO",
            logo: logo,
            description: "",
        })
            .then(() => { })
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
                            <VisuallyHiddenInput type="file" />
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
