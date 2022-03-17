import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const type = "Passi";


  

export const AddPassport = () => {
  const axiosPrivate = useAxiosPrivate();

  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState();
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const birthday = bday.toLocaleDateString();
    //data
    const data = new FormData();
    data.append("name", name);
    data.append("bday", birthday);
    data.append("country", country);
    data.append("toAddress", type);
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    try {
      const response = await axiosPrivate.post('/transactions/add', data); 
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container' style={{width: '500px', textAlign: 'left'}}>
      <h2>Lisää uusi passi</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nimi</label>
        <input type="text" 
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Syntymäaika</label>
        <ReactDatePicker
          selected={bday}
          dateFormat='dd/MM/yyyy'
          onChange={date => setBday(date)}
        />
        
      </div>
      <div className="mb-3">
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
        />
      </div>
      <label>Kuva edestä</label>
      <div className="mb-3">
        <input type="file" id="img" name="img" accept="image/*" onChange={e => {
          const file = e.target.files[0];
          setFiles(oldArray => [...oldArray, file]);
        }}/>
      </div>
      <label>Kuva takaa</label>
      <div className="mb-3">
        <input type="file" id="img" name="img" accept="image/*" onChange={e => {
          const secondFile = e.target.files[0];
          setFiles(oldArray => [...oldArray, secondFile]);
        }}/>
      </div>
      <button type="submit" className="btn btn-primary">Go</button>
      <div className='mb-3'>
      </div>
    </form>
    </div>
  )
}
