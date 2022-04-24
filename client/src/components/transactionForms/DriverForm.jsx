import { useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useNavigate} from "react-router"

const animatedComponents = makeAnimated();

export const DriverForm = ({imagePath, submit}) => {
  const navigate = useNavigate();

  const [Column1, setColumn1] = useState('');
  const [Column2, setColumn2] = useState('');
  const [Column3, setColumn3] = useState('');
  const [Column4, setColumn4] = useState('');
  const [licenses, setLicenses] = useState([]);
  
  const options = [
    {value: 'AM', label: 'AM'},
    {value: 'A1', label: 'A1'},
    {value: 'A2', label: 'A2'},
    {value: 'B1', label: 'B1'},
    {value: 'B', label: 'B'},
    {value: 'C1', label: 'C1'},
    {value: 'D1', label: 'D1'},
    {value: 'D', label: 'D'}
  ];

  const handleTransaction = async (valid) => {
    const data = new FormData();
    data.append("Myönnetty", Column1);
    data.append("Viim.voim.olopv", Column2);
    data.append("Myöntäjä", Column3);
    data.append("Hallinnoll.nro", Column4);
    data.append("Ajoluvat", licenses);
    await submit({data, valid});
    navigate('/transactions');   
  }

  const licenseHandler = (e) => {
    const result = Object.values(e).map(({value}) => value);
    setLicenses(result)
  }


  return (
    <>
      <div className="form-row">
        <p>Myönnetty</p>
        <input type="text" className="form-input" value={Column1} onChange={(e) => setColumn1(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Viim.voim.olopv.</p>
        <input type="text" className="form-input" value={Column2} onChange={(e) => setColumn2(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Myöntäjä</p>
        <input type="text" className="form-input" value={Column3} onChange={(e) => setColumn3(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Hallinnoll.nro</p>
        <input type="text" className="form-input" value={Column4} onChange={(e) => setColumn4(e.target.value)}/>
      </div>
      <span style={{padding: '5px'}}></span>
        <Select 
          options={options}  
          closeMenuOnSelect={false}
          components={animatedComponents}
          placeholder="Ajoluvat"
          isMulti
          onChange={licenseHandler}
        />
        <div className="tx-image">
          <img 
            src={`../uploads/${imagePath}`} 
            id="tx"
            alt="tx_image"
            />
        </div>
        <div className="buttonGroup">
          <button className="logoutBtn accept" type="submit" onClick={() => handleTransaction(true)}>Hyväksy</button>
          <button className="logoutBtn decline" type="submit" onClick={() => handleTransaction(false)}>Hylkää</button>
      </div>
    </>
  )
}
