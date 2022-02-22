import React, { useState, useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export const GenerateKey = () => {

  const [disabled, setDisabled] = useState(true);
  const [publicKey, setPublicKey] = useLocalStorage("PublicKey", "");
  const [privateKey, setPrivateKey] = useLocalStorage("PrivateKey", "");
  const [btnText, setBtnText] = useState('Unlock');
  const [checked, setChecked] = useState(true);


// luo uuden lompakon
  const GenerateKeyClickHandler = () => {
      const key = ec.genKeyPair();
      const publicKey = key.getPublic('hex');
      const privateKey = key.getPrivate('hex');
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
  }


  // tallentaa avaimen local storageen
  const changeInputDisabled = () => {
    setDisabled(!disabled);
    if(disabled) {
      setBtnText('Save');
    } else {
      setBtnText('Unlock');
      const wallet = ec.keyFromPrivate(privateKey);
      const publicAddress = wallet.getPublic('hex');
      setPublicKey(publicAddress);
    }
  }


  const changeButtonDisabled = () => {
    setChecked(!checked);
  }

  return (
    <div style={{ textAlign: "left" }}>
      <button className="btn btn-primary" onClick={GenerateKeyClickHandler}>
        Generate key
      </button>
      <br />
      <br />
      <div className="row">
        <div className="mb-3">
          <input
            className='form-control'
            placeholder='Public key'
            disabled={true}
            style={{cursor: 'text'}}
            value={publicKey}
          />
        </div>
        <div className="mb-3">
          <input
          className='form-control'
          placeholder='Private key'
          disabled={disabled ? "disabled" : ""}
          style={{cursor: 'pointer'}}
          onChange={e => setPrivateKey(e.target.value)}
          value={privateKey}
          />
          <br/>

          {/* TÄHÄN VAIKKA CAPTCHA */}
          <div className="form-check">
            <input className='form-check-input' 
            type="checkbox"
            value={checked}
            onClick={changeButtonDisabled}
            />
            <label>En ole robotti</label>
          </div>
          {/* ------------------------ */}

          <br/>
          <button
           className='btn btn-primary'
           onClick={changeInputDisabled}
           disabled={checked ? "disabled" : ""}>
           {btnText}
           </button>
        </div>
      </div>
    </div>
  );
}



