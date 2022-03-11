import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
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
          <li className="nav-item active">
              <Link to="/login" className="nav-link">Kirjaudu</Link>
          </li>
          <li className="nav-item active">
              <Link to="/register" className="nav-link">Rekisteröidy</Link>
          </li>
      </nav>
    );
  }
}
