import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ec as EC } from 'elliptic';
import { Transaction} from '../services/Block.js';
import { Blockchain } from '../services/Blockchain.js';
const ec = new EC('secp256k1');
export const blockchain = new Blockchain();

  

export const AddPassport = () => {
  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState('');
  const [toAddress, setToAddress] = useState('Passi');
  const [fromAddress, setFromAddress] = useState('0447dafe4c592ac536318f35c34cc0f2f2c105d4cd884cd14e84dabd5326d36c5d43dfd7da85e0153d97fa963d5fb906b2662d3ba3dbe69e6fb13349007f253420')
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);

 



  const handleSubmit = (e) => {
    e.preventDefault(); 

    // data
    const user = {
      name: name,
      bday: bday,
      country: country,
    }

    // signature key
    const myKey = ec.keyFromPrivate('f128489de34f07ae456bd72b61cf095c0e35ec84f828c91808b8986df9fcfc91');

    //validation
    const newTX = new Transaction(fromAddress, toAddress, user);
    newTX.signTransaction(myKey);

    // error handling here ----------------
    blockchain.addTransaction(newTX);
    const transaction = blockchain.pendingTransactions[0];
    
    
    axios.post('http://localhost:5000/transactions/add', transaction)
    .then(res => console.log(res.data));

    // window.location = '/blocks/add';
  }

  return (
    <div className='container' style={{width: '500px', textAlign: 'left'}}>
      <h2>Lataa passi lohkoon</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nimi</label>
        <input type="text" 
          className="form-control"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Syntymäaika</label>
        <ReactDatePicker
          selected={bday}
          onChange={date => setBday(date)}
          dateFormat='dd/MM/yyyy'
        />
        
      </div>
      <div className="mb-3">
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Go</button>
      <div className='mb-3'>
      </div>
    </form>
    </div>
  )
}
