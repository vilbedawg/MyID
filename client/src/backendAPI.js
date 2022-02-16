import React, { Component, useEffect, useState } from 'react'

export default class BackendAPI extends Component {
    constructor() {
        super();
        this.state = {
            renderedResponse: ''
        };
    }

    getResponse = async() => {
        const response = await fetch('/api');
        const body = await response.json();
        if(response.status !== 200) throw Error(body.message);
    
        return body;
      };
    
    componentDidMount() {
        this.getResponse()
        .then(res => {
          const someData = res;
          this.setState({ renderedResponse: someData});
        });
    }

  render() {

    return (
      <div>
          <h2>Call out to API</h2>
          <p>{this.state.renderedResponse}</p>
      </div>
    )
  }
}
