import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


  

export default function AddDriverLisence() {
  const axiosPrivate = useAxiosPrivate();

  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState();
  const [files, setFiles] = useState([]);
  const type = process.env.REACT_APP_AJOKORTTI;

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
      <div className="newPassport">
        <p>Uusi ajokortti hakemus</p>
        <form onSubmit={handleSubmit}>

          <label>Nimi: </label>
          <input type="text" placeholder="Nimi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Syntymäpäivä:</label>
          <ReactDatePicker
            selected={bday}
            dateFormat='dd/MM/yyyy'
            onChange={date => setBday(date)}
          /> 
          
          <label>Maa:</label>
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
          />
        <label>Passikuva:  
          <input type="file" id="img" name="img" accept="image/*" onChange={e => {
            const file = e.target.files[0];
            setFiles(oldArray => [...oldArray, file]);
          }}/></label>
        <button type="submit">Lähetä</button>
      </form>
        
      </div>
  )
}
