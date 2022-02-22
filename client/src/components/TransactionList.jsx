import React, { useEffect, useState } from 'react'
import { shortenAddress } from '../utils/shortenAddress'

export const TransactionList = ({transactions}) => {


  return (
    <div className='container-fluid' style={{height: '500px', overflowY: 'scroll'}}>
        {transactions.map((key)=> (
          <div className='card' key={key.timestamp} style={{margin: '1rem', textAlign: 'left', padding: '2rem'}}>
            <li><strong>fromAddress:</strong> {shortenAddress(key.fromAddress)}</li>
            <li><strong>Type:</strong> {key.toAddress}</li>
            <li><strong>timestamp:</strong> {key.timestamp}</li>
            <li><strong>name:</strong> {key.data.name}</li>
            <li><strong>country:</strong> {key.data.country}</li>
          </div>
        ))}
    </div>
  )
}
