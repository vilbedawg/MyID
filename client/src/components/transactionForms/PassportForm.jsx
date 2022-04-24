import { useNavigate } from "react-router";
import { useState } from "react";
import ReactDatePicker from 'react-datepicker';

export const PassportForm = ({submit, imagePath}) => {
  const navigate = useNavigate();
  const [Column1, setColumn1] = useState('');
  const [Column2, setColumn2] = useState('');
  const [Column3, setColumn3] = useState('');
  const [Column4, setColumn4] = useState('');
  const [Column5, setColumn5] = useState('');
  const [Column6, setColumn6] = useState('');
  const [Column7, setColumn7] = useState('');
  const [Column8, setColumn8] = useState('');

  const handleTransaction = async (valid) => {

    const data = new FormData();
    data.append("Passin numero", Column1);
    data.append("Kansalaisuus", Column2);
    data.append("Syntymävaltio", Column3);
    data.append("Syntymäkotikunta", Column4);
    data.append("Myönnetty", Column5);
    data.append("Viim.voim.olopv", Column6);
    data.append("Tunnus", Column7);
    data.append("Viranomainen", Column8);
    await submit({data, valid});
    navigate('/transactions');   
  }


  return (
    <>
     <div className="form-row">
        <p>Passin numero</p>
        <input type="text" className="form-input" value={Column1} onChange={(e) => setColumn1(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Kansalaisuus</p>
        <input type="text" className="form-input" value={Column2} onChange={(e) => setColumn2(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Syntymävaltio</p>
        <input type="text" className="form-input" value={Column3} onChange={(e) => setColumn3(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Syntymäkotikunta</p>
        <input type="text" className="form-input" value={Column4} onChange={(e) => setColumn4(e.target.value)}/>
      </div>
      <div className="form-row">
      {/* <ReactDatePicker
          selected={Column5}
          dateFormat='dd/MM/yyyy'
          onChange={date => setColumn5(date)}
        />  */}
        <p>Myönnetty</p>
        <input type="text" className="form-input" value={Column5} onChange={(e) => setColumn5(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Viim. Voim.olopv</p>
        <input type="text" className="form-input" value={Column6} onChange={(e) => setColumn6(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Tunnus</p>
        <input type="text" className="form-input" value={Column7} onChange={(e) => setColumn7(e.target.value)}/>
      </div>
      <div className="form-row">
        <p>Viranomainen</p>
        <input type="text" className="form-input" value={Column8} onChange={(e) => setColumn8(e.target.value)}/>
      </div>
      <span style={{padding: '10px'}}></span>
        <img 
          src={`../uploads/${imagePath}`} 
          id="tx"
          alt="tx_image"
        />
      <div className="buttonGroup">
        <button className="logoutBtn accept" onClick={() => handleTransaction(true)}>Hyväksy</button>
        <button className="logoutBtn decline" onClick={() => handleTransaction(false)}>Hylkää</button>
      </div>
    </>
  )
}
