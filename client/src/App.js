import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { CreateBlock } from './components/CreateBlock';
import { AddPassport } from './components/AddPassport';
import BlockchainList from './components/BlockchainList';
import { UserDetails } from './components/UserDetails';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Dashboard from './components/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blocks" element={<BlockchainList />} />
          <Route path="/transactions/add" element={<AddPassport />} />
          <Route path="/blocks/add" element={<CreateBlock />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
