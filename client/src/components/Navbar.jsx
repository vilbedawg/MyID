import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" >
          Navbar
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/blocks" className="nav-link">View Blockchain</Link>
            </li>
            <li className="nav-item active">
              <Link to="/transactions/add" className="nav-link">Create Transaction</Link>
            </li>
            <li className="nav-item active">
              <Link to="/blocks/add" className="nav-link">Pending Transactions</Link>
            </li>
          </ul>
        </div>
          <li className="nav-item active">
              <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item active">
              <Link to="/register" className="nav-link">Register</Link>
          </li>
      </nav>
    );
  }
}
