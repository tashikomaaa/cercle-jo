import React from 'react';
import logo from './assets/images/logo/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vous est offert par <a href="https://lecercle.community/">Le Cercle</a> 
        </a>
      </header>
    </div>
  );
}

export default App;
