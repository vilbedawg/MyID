import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Etusivu</Link>
            </li>
            <li className="nav-item active">
              <Link to="/blocks" className="nav-link">Lohkoketju</Link>
            </li>
            <li className="nav-item active">
              <Link to="/transactions/add" className="nav-link">Lisää uusi</Link>
            </li>
            <li className="nav-item active">
              <Link to="/blocks/add" className="nav-link">Odottavat</Link>
            </li>
          </ul>
        </div>
        <div style={{display : 'flex'}}>
        {user ? (
          <>
          <li className="nav-item active">
              <button className="btn btn-primary" onClick={onLogout}>Kirjaudu ulos</button>
          </li>
          </>) : (
            <>
          <li className="nav-item active">
              <Link to="/login" className="nav-link">Kirjaudu sisään</Link>
          </li>
          <li className="nav-item active">
              <Link to="/register" className="nav-link">Rekisteröidy</Link>
          </li>
          </>
          )}
        </div>
          
      </nav>
  )
}

