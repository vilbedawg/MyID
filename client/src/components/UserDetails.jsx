import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import {shortenAddress} from '../utils/shortenAddress'

export const UserDetails = () => {
  const [fromAddress, setFromAddress] = useState('0458440656c4cab5c56494b4ab5959f2e1fbed6ed7dde8d075aa9bb3a9e2de15c7c6e1bc75eee9fb6f76f2d7ca6638dc5d87eeacf918ab360c07cb5b21466ef5d9');
  const [userData, setUserData] = useState('');
  const [files, setFiles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get('http://localhost:5000/user', {
        params: {
          type: 'Passi',
          id: fromAddress
        }
      });
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
