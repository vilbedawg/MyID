import { Block, Transaction } from "./Block.js";
import axios from "axios";

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(Date.now(), ["Genesis Block"], "0");
  }


  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    let block = new Block(
      Date.now('dd/MM/yyyy'),
      this.pendingTransactions,
      this.getLatestBlock().hash
      );
      block.mineBlock(this.difficulty);
      // Save the block to the DB

      axios.post('http://localhost:5000/blocks/add', block)
      .then(res => console.log(res.data));
      // this.chain.push(block);
      // Save the miner address to the next block
      
      axios.post('http://localhost:5000/transactions/delete')
      .then(res => console.log(res.data));
      this.pendingTransactions = [];    
  }

  addTransaction(transaction) {

    if(!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address')
    }

    if(!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (let i = 0; i < block.transactions.length; i++) {
        const transFrom = block.transactions[i].fromAddress;
        const transTo = block.transactions[i].toAddress;
        const amount = block.transactions[i].data;

        if (transFrom === address) {
          balance -= amount;
        }

        if (transTo === address) {
          balance += amount;
        }
      }
    }

    return balance;
  }


  isChainValid() {

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(!currentBlock.hasValidTransaction()) {
        return false;
      }

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}
