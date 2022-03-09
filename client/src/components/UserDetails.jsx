import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import {shortenAddress} from '../utils/shortenAddress'
export const UserDetails =  () => {
  const [fromAddress, setFromAddress] = useLocalStorage('PublicKey', '');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/user/', {
      params: {
        type: 'Passi',
        id: fromAddress
      }
    })
    .then(res => {
      console.log(res.data)
      setUserData(res.data);
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  return (
    <div>
      <h3>{shortenAddress(fromAddress)}</h3>
      <div style={{border: '1px solid black', padding: '2rem'}}>
      </div>
    </div>
  )
}
