import { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


  

export default function AddDriverLisence() {
  const axiosPrivate = useAxiosPrivate();

  const [name, setName] = useState('');
  const [hetu, setHetu] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState();
  const [postLocation, setPostLocation] = useState();
  const [address, setAddress] = useState();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const birthday = bday.toLocaleDateString();
    const data = new FormData();
    data.append("Tyyppi", process.env.REACT_APP_AJOKORTTI);
    data.append("Nimi", name);
    data.append("Henkilötunnus", hetu);
    data.append("Syntymäaika", birthday);
    data.append("Maa", country);
    data.append("Osoite", address);
    data.append("Postitoimipaikka", postLocation);
    
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    try {
      await axiosPrivate.post(process.env.REACT_APP_ADDTX, data); 
      navigate("/NewIDSent", {replace: true });
    } catch (error) {
      toast.error(error.response.data?.message);
      toast.error(error.response.data);
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
          
          <label>Henkilötunnus: </label>
          <input type="text" placeholder="Henkilötunnus"
            value={hetu}
            onChange={(e) => setHetu(e.target.value)}
          />

          <label>Maa:</label>
          <CountryDropdown
            defaultOptionLabel='Valitse maa'
            value={country}
            onChange={(val) => setCountry(val)}
          />

          <label>Osoite: </label>
          <input type="text" placeholder="Osoite"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />    

          <label>Postitoimipaikka: </label>
          <input type="text" placeholder="Postitoimipaikka"
            value={postLocation}
            onChange={(e) => setPostLocation(e.target.value)}
          />  

          <label>Passikuva:  
          <input type="file" id="img" name="img" accept="image/*" onChange={e => {
            const file = e.target.files[0];
            setFiles(oldArray => [...oldArray, file]);
          }}/></label>
        <button type="submit" className='formBtn'>Lähetä</button>
      </form>
        
      </div>
  )
}
