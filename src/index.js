import React, { useState, useContext } from 'react';
import { PositionProvider } from './core/context/PositionContext';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ReactPWAInstallProvider } from 'react-pwa-install';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PositionProvider>
            <ReactPWAInstallProvider enableLogging>
                <App />
            </ReactPWAInstallProvider>
        </PositionProvider>
    </React.StrictMode>
);
serviceWorkerRegistration.register({
    onUpdate: (e) => {
        const { waiting: { postMessage = null } = {}, update } = e || {};
        if (postMessage) {
            postMessage({ type: 'SKIP_WAITING' });
        }
        update().then(() => {
            window.location.reload();
        });
    },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
