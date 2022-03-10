import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import {shortenAddress} from '../utils/shortenAddress'

export const UserDetails =  () => {
  const [fromAddress, setFromAddress] = useLocalStorage('PublicKey', '');
  const [userData, setUserData] = useState('');
  const [transaction, setTransaction] = useState('');
  const [files, setFiles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get('http://localhost:5000/user', {
        params: {
          type: 'Passi',
          id: fromAddress
        }
      });
      setTransaction(request.data)
      setUserData(request.data.data)
      setFiles(request.data.data.files)
      console.log(request.data)
      return request;
    }
    fetchData();
  }, []);

  

  return (
    <div>
      <h3>{shortenAddress(fromAddress)}</h3>
      {files !== undefined ? <div className='container'>
        {files.map((file) => <img src={'/uploads/'+file.filename} style={{maxWidth: '500px'}}></img>)}
      </div> : <p>No picture</p>}
      <div className='container' style={{textAlign: 'left'}}>
      <div className="row row-cols-1">
        <div className="col"><span className='desc'>Nimi:</span>{userData.name}</div>
        <div className="col"><span className='desc'>Kansalaisuus:</span>{userData.country}</div>
        <div className="col"><span className='desc'>Syntymäaika:</span>{userData.birthday}</div>
      </div>
      </div>
    </div>
  )
}
