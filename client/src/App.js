import './App.css';
import React from 'react';
import BackendAPI from './components/backendAPI';
import { runChain } from './components/main';

function App() {

  return (
    <div className="App">
    <BackendAPI/>
    <button onClick={runChain} className="mine-btn">mine</button>
    </div>
  );
}

export default App;
