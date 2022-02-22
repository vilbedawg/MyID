import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ec as EC } from 'elliptic';
import { Transaction} from '../services/Block.js';
import { Blockchain } from '../services/Blockchain.js';
import useLocalStorage from "use-local-storage";
const ec = new EC('secp256k1');
export const blockchain = new Blockchain();

  

export const AddPassport = () => {
  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState('');
  const [toAddress, setToAddress] = useState('Passi');
  const [fromAddress, setFromAddress] = useLocalStorage("PublicKey", "");
  const [privateKey, setPrivateKey] = useLocalStorage("PrivateKey", "");
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
    const myKey = ec.keyFromPrivate(privateKey);

    //validation
    const newTX = new Transaction(fromAddress, toAddress, user);
    newTX.signTransaction(myKey);

    // error handling here ----------------
    blockchain.addTransaction(newTX);
    const transaction = blockchain.pendingTransactions[0];
    
    
    axios.post('http://localhost:5000/transactions/add', transaction)
    .then(res => console.log(res.data));

    window.location = '/blocks/add';
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
