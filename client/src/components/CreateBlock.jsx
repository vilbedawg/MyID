import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { blockchain } from './AddPassport'
import { TransactionList } from './TransactionList';
import { testChain } from '../services/test.js';

export const CreateBlock = () => {
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
    .then(res => {
      setTransactions(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  return (
    <div className='container'>
      {transactions && <TransactionList transactions={transactions}/>}
      <br />
      <button className='btn btn-primary' onClick={() => testChain(transactions)}>Mine</button>
    </div>
  )
}
