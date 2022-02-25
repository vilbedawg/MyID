import React, { useEffect, useState, useLocalStorage } from 'react'
import axios from 'axios'
import { TransactionList } from './TransactionList';
import { shortenAddress } from '../utils/shortenAddress';


export const CreateBlock = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromAddress, setFromAddress] = useState();
  const [disabled, setDisabled] = useState(false);
  
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
      let key = localStorage.getItem('PublicKey')
      setFromAddress(key);
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  return (
    <div className='container'>
      {transactions && <TransactionList transactions={transactions}/>}
      <br />
      <p>Address: {fromAddress !== undefined ? shortenAddress(fromAddress) : fromAddress}</p>
      <button className='btn btn-primary' onClick={() => testChain(transactions)}>Mine</button>
    </div>
  )
}
