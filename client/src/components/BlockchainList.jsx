import React, { Component } from "react";
import { GenerateKey } from "./GenerateKey";
import { shortenAddress } from "../utils/shortenAddress";

export default class BlockchainList extends Component {
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
      <div>
        <h3>Blocks</h3>
      <div className="d-flex flex-row bd-highlight mb-3" style={{overflowX: 'scroll', textAlign: 'left'}}>
        {this.state.data.map((block, index) => (
          <div className="p-2 bd-highlight" key={block._id}>
            <div className="p-2 bd-highlight" style={{border: '1px solid gray',  minHeight: '300px', justifyContent: 'space-between'}}>
              <p>hash: {block.hash}</p>
              <p>nonce: {block.nonce}</p>
              <p>previousHash: {block.previousHash}</p>
              <p>timestamp: {block.timestamp}</p>
            </div>
          </div>
        ))}
        </div>
        <GenerateKey />
      </div>
    );
  }
}
