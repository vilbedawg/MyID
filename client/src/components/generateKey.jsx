import React, { Component } from 'react'
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export default class GenerateKey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            publicKey: localStorage.getItem('PublicKey'),
            privateKey: localStorage.getItem('PrivateKey'),
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');
        const privateKey = key.getPrivate('hex');
        this.setState({
            publicKey: publicKey,
            privateKey: privateKey
        });

        localStorage.setItem('PublicKey', publicKey);
        localStorage.setItem('PrivateKey', privateKey)
    }


  render() {
    return (
      <div style={{textAlign: 'left'}}>
      <button className="btn btn-primary" onClick={this.clickHandler}>Generate key</button>
      <p style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '80%'}}>
        Public key: {this.state.publicKey}
      </p>
      <p style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '80%'}}>
        Private key: {this.state.privateKey}
      </p>
      </div>
    )
  }
}
