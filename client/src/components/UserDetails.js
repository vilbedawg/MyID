import React, { Component } from "react";
import { testChain } from "../services/test";
export default class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("/api/blocks")
      .then((res) => res.json())
      .then((data) => this.setState({ data }, () => console.log("data fetched..", data))
      );
  }

  render() {
    return (
      <div className="container">
        <h3>Tietokanta data</h3>
        <ul>
          {this.state.data.map(block => 
            <li key={block._id}>{block.transactions}</li>
          )}
        </ul>
        <button onClick={testChain}>Test chain functions</button>
      </div>
    );
  }
}
