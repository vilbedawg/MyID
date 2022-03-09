import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navBar">
        <a className="logo">MyID</a>
        <div className="vl"></div>
        <div className="navLinks">
          <ul>
            <li>
              <Link to="/">Home</Link></li>
            <li>
              <Link to="/blocks">View Blockchain</Link></li>
            <li>
              <Link to="/transactions/add">Create Transaction</Link></li>
            <li>
              <Link to="/blocks/add">Pending Transactions</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
