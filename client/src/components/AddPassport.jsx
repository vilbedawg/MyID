import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import useLocalStorage from "use-local-storage";
import CryptoJS from 'crypto-js';

  

export const AddPassport = () => {
  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState();
  const [toAddress, setToAddress] = useState('Passi');
  const [fromAddress, setFromAddress] = useLocalStorage("PublicKey", "");
  const [privateKey, setPrivateKey] = useLocalStorage("PrivateKey", "");
  const [file, setFile] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // crypt key 
    const cryptedKey = CryptoJS.AES.encrypt(privateKey, 'secret key 1').toString();

    //data
    const data = new FormData();
    data.append("name", name);
    data.append("bday", bday);
    data.append("country", country);
    data.append("key", cryptedKey);
    data.append("file", file);
  
    const newTransaction = {
      fromAddress, 
      toAddress, 
      data,
      cryptedKey
    };
  

    // // error handling here ----------------
    axios.post('http://localhost:5000/transactions/add', data)
    .then(res => console.log(res))
    .catch(err => console.log(err));

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
      <div className="mb-3">
        <input type="file" id="img" name="img" accept="image/*" onChange={e => {
          const file = e.target.files[0];
          setFile(file);
        }}/>
      </div>
      <button type="submit" className="btn btn-primary">Go</button>
      <div className='mb-3'>
      </div>
    </form>
    </div>
  )
}
