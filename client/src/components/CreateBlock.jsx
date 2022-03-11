import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TransactionList } from './TransactionList';
import { shortenAddress } from '../utils/shortenAddress';


export const CreateBlock = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromAddress, setFromAddress] = useState('0458440656c4cab5c56494b4ab5959f2e1fbed6ed7dde8d075aa9bb3a9e2de15c7c6e1bc75eee9fb6f76f2d7ca6638dc5d87eeacf918ab360c07cb5b21466ef5d9');
  const [privateKey, setPrivateKey] = useState('4d6f73e1679a77b107d6cefea832124c2de665d0e143e7875fa1898e03e8f3a3');

  const testChain = (transactions) => {
    const reqBody = {
      transactions: transactions,
      fromAddress: fromAddress
    }
    axios.post('http://localhost:5000/blocks/add', reqBody)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:5000/transactions')
    .then(res => {
      setTransactions(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  return (
    <div className='container'>
      {transactions && <TransactionList transactions={transactions}/> }
      <br />
      <p>Address: {fromAddress !== undefined || null ? shortenAddress(fromAddress) : fromAddress}</p>
      <button className='btn btn-primary' onClick={() => testChain(transactions)}>Mine</button>
    </div>
  )
}
