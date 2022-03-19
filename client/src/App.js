import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AddPassport } from './components/AddPassport';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import Dashboard from './pages/Dashboard';
import { Layout } from './components/Layout';
import { Missing } from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import { Unauthorized } from './pages/Unauthorized';
import PersistLogin from './components/PersistentLogin';
import { ViewTransaction } from './pages/ViewTransaction';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* protected routes for USERS */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<AddPassport />} />
          </Route>

          {/* protected routes for ADMINS */}
          <Route element={<RequireAuth allowedRoles={[5024]} />}>
            <Route path="/blocks" element={<Admin />} />
            <Route path="/blocks/:id" element={<ViewTransaction />} />
          </Route>

        </Route>

        {/* everything else */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
