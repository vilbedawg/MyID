import { Block, Transaction } from "./Block.js";
import block from "../models/block.model.js";
import transaction from "../models/transaction.model.js";

export class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  async createGenesisBlock() {
    const genesis = new Block(new Date().getTime(), "Genesis Block", "0");
    console.log('Initializing Genesis block..');
    let genesisBlock = new block({
      previousHash: genesis.previousHash,
      timestamp: new Date().getTime(),
      transactions: genesis.transactions,
      hash: genesis.hash,
      nonce: genesis.nonce
    });
    console.log('Genesis block created');
    await genesisBlock.save();
  }

  async getChainLength() {
    let blockchainInfo = await block.find();
    for(let i = 0; i < blockchainInfo.length; i++) {
      this.chain.push(blockchainInfo[i]);
    }
  }

  async getGenesisBlock() {

  }

  async getLatestBlock() {
    let blockInfo = await block.find().sort({ $natural: -1}).limit(1);
    return (blockInfo.length > 0) ? blockInfo[0] : null;
  }


  async minePendingTransactions(miningRewardAddress) {
    let lastBlockInfo = await this.getLatestBlock();
    if(lastBlockInfo) { 
      
      // reward for the miner
      const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
      this.pendingTransactions.push(rewardTx);

      // new block instance
      let currentBlockInfo = new Block(
        new Date().getTime(),
        this.pendingTransactions,
        lastBlockInfo.hash
      );
 
      
      await currentBlockInfo.mineBlock(this.difficulty);
      console.log(`hash ${currentBlockInfo.hash} successfully mined`);
      this.pendingTransactions = []; 
      this.chain.push(currentBlockInfo);
      return;
    }
    // if no previous block is found, create the genesis block
    this.createGenesisBlock();
    return false;
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


  // async isChainValid() {
  //   await this.getChainLength();
  //   for (let i = 1; i < this.chain.length; i++) {
  //     const currentBlock = this.chain[i];
  //     const previousBlock = this.chain[i - 1];

  //     const currentBlockInstance = new Block(
  //       currentBlock.timestamp,
  //       currentBlock.transactions,
  //       currentBlock.previousHash,
  //       currentBlock.hash,
  //       currentBlock.nonce
  //     );


  //     // if(!currentBlockInstance.hasValidTransaction()) {
  //     //   return false;
  //     // }

  //     if (previousBlock.hash !== currentBlock.previousHash) {
  //       return false;
  //     }

  //     if (currentBlock.hash !== currentBlock.calculateHash()) {
  //       return false;
  //     }

  //   }
  //   console.log('is valid');
  //   return true;
  // }



  async checkChainValidity() {
    // this.getChainLength();
        for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
          console.log('\n')
          console.log(`Validating Block(${i}): ${currentBlock.hash}`);
          // recreate the block with the info from database
          const currentBlockInstance = new Block(currentBlock.timestamp, null, currentBlock.previousHash);
          
          // if (currentBlock.previousHash !== previousBlock.hash) {
          //   console.log(`Stored hash(${currentBlock.hash}) and computed hash(${currentBlock.hash}) doesn't match`);
          //   return false;
          // }
          
          // console.log(`Hash validated: ${currentBlock.hash} -> SUCCESS`);

          // // check if tampered with
          if (currentBlock.hash !== currentBlockInstance.calculateHash()) {
            console.log(`Hash invalid: ${currentBlockInstance.hash}`)
            return false;
          }
                
      }
        
            // else {
            //     console.log(`Genesis Block(${idx}): ${entry.hash}`);
            //     previousBlock = new Block(entry.timestamp, entry.transactions, entry.previousHash, entry.hash, entry.nonce);
            //     previousBlock.mineBlock(this.difficulty);
            //     idx++;
            // }

      }




      // turha, voi poistaa
  async getBalanceOfAddress(address) {
    let balance = 0;
    // await this.getChainLength();
    for await (const block of this.chain) {
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
    console.log('Balance of this account is:', balance);
    return balance;
  }

}
