import { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { CountryDropdown } from 'react-country-region-selector';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router';


  

export default function AddPassport() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [hetu, setHetu] = useState('');
  const [bday, setBday] = useState(new Date());
  const [country, setCountry] = useState();
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const birthday = bday.toLocaleDateString();
    //data
    const data = new FormData();
    data.append("Nimi", name);
    data.append("Syntymäaika", birthday);
    data.append("Henkilötunnus", hetu);
    data.append("Maa", country);
    data.append("Tyyppi", process.env.REACT_APP_PASSI);
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    try {
      const response = await axiosPrivate.post(process.env.REACT_APP_ADDTX, data); 
      navigate("/NewIDSent", {replace: true });
    } catch (error) {
      console.error(error)
    }
  }

  return (
      <div className="newPassport">
        <p>Uusi passi hakemus</p>
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
            value={country}
            onChange={(val) => setCountry(val)}
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
