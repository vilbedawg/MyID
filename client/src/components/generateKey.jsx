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
    <div className="genKey">
      <button className="genBtn" onClick={GenerateKeyClickHandler}>
        Generate key
      </button>
      <br />
      <br />
          <input className="genInput"
            placeholder='Public key'
            disabled={true}
            style={{cursor: 'text'}}
            value={publicKey}
          />
          <input className="genInput"
          placeholder='Private key'
          disabled={disabled ? "disabled" : ""}
          style={{cursor: 'pointer'}}
          onChange={e => setPrivateKey(e.target.value)}
          value={privateKey}
          />
          <br/>

          {/* TÄHÄN VAIKKA CAPTCHA */}
            <input
            type="checkbox"
            value={checked}
            onClick={changeButtonDisabled}
            />
            <label>En ole robotti</label>
          {/* ------------------------ */}

          <br/>
          <button className="genBtn"
           onClick={changeInputDisabled}
           disabled={checked ? "disabled" : ""}>
           {btnText}
           </button>
    </div>
  );
}



