import React from 'react'
import { blockchain } from './AddPassport'
import { TransactionList } from './TransactionList';

export const CreateBlock = () => {

  const test = () => {
    console.log(blockchain.pendingTransactions);
  }

  return (
    <div className="content">
      <TransactionList/>
      <button onClick={test}>Test</button>
    </div>
  )
}
