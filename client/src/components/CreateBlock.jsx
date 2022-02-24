import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TransactionList } from './TransactionList';


export const CreateBlock = () => {
  const [transactions, setTransactions] = useState([]);

  const testChain = (transactions) => {
    if(transactions.length < 1) {
      console.log('Must include atleast 1 transaction');
      return;
    }
    axios.post('http://localhost:5000/blocks/add', transactions)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

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
