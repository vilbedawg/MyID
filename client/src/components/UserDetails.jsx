import React, { Component } from "react";
import { GenerateKey } from "./GenerateKey";


export default class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("/blocks")
      .then((res) => res.json())
      .then((data) => this.setState({ data }, () => console.log("data fetched..", data))
      );
  }

  render() {
    return (
      <div className="container">
        <h3>Blocks</h3>
        <div className="row">
          {this.state.data.map(block => 
            <div className="col" key={block._id}>
              <p>hash: {block.hash}</p>
              <p>nonce: {block.nonce}</p>
              <p>previousHash: {block.previousHash}</p>
              <p>timestamp: {block.timestamp}</p>
              <p>transaction: {block.transactions}</p>
            </div>
          )}
        </div>
        <GenerateKey />
      </div>
    );
  }
}
