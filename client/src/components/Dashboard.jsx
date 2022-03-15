import React from 'react'
import axios from 'axios'


export default function Dashboard() {
  const getToken = () => {
    axios.get('http://localhost:3000/userdata', {
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  const getRefresh = () => {
    axios.get('http://localhost:3000/refresh', {
      withCredentials: true
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }



  return (
    <div>
        <h1>MyID</h1>
        <p>Etusivu</p>
        <button className='btn btn-primary' onClick={getToken}>Get me</button>
        <button className='btn btn-primary' onClick={getRefresh}>Refresh token</button>
    </div>
  )
}
