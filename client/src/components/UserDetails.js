import React, { Component } from "react";

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
        <h2>Käyttäjän data</h2>
        <ul>
          {this.state.data.map(block => 
            <li key={block._id}>{block.transactions}</li>
          )}
        </ul>
      </div>
    );
  }
}
