import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import CreateBlock from './components/CreateBlock';
import CreateTransaction from './components/CreateTransaction';
import BlockchainList from './components/BlockchainList';
import UserDetails from './components/UserDetails';


function App() {

  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<UserDetails />} />
          <Route path="/blocks" element={<BlockchainList />} />
          <Route path="/transactions/add" element={<CreateTransaction />} />
          <Route path="/blocks/add" element={<CreateBlock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
