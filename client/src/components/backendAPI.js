import React, { Component } from 'react'

export default class BackendAPI extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
    }

    componentDidMount() {
      fetch('/api/blocks')
      .then(res => res.json())
      .then(data => this.setState({data}, () => console.log('data fetched..', data)));
    }

    

  render() {
    return (
      <div className='container'>
        <h2>Data tähän</h2>
        <ul>
          {this.state.data.map(data => 
            <li key={data.id}>{data.data}</li>
          )}
        </ul>
      </div>
    )
  }
}
