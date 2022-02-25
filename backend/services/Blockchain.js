import { Block, Transaction } from "./Block.js";
import block from "../models/block.model.js";
import transaction from "../models/transaction.model.js";
import ApiError from '../middleware/ApiError.js';

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
    return this.chain[this.chain.length - 1];
  }


  async getLatestBlock() {
    let blockInfo = await block.find().sort({ $natural: -1}).limit(1);
    return (blockInfo.length > 0) ? blockInfo[0] : null;
  }


  async minePendingTransactions(miningRewardAddress) {
    let lastBlockInfo = await this.getLatestBlock();

    if(lastBlockInfo) { 
      // new block instance to add make a new block
      let currentBlockInfo = new Block(
        new Date().getTime(),
        this.pendingTransactions,
        lastBlockInfo.hash
      );

      await currentBlockInfo.mineBlock(this.difficulty);
      console.log(`hash ${currentBlockInfo.hash} successfully mined`);
      this.pendingTransactions = []; 
      this.chain.push(currentBlockInfo);

      // include the transactions in the block
      await transaction.deleteMany({});

      // reward transaction for the miner to be included in the next block
      const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
      this.pendingTransactions.push(rewardTx);
      return true;
    }
    // if no previous block is found, we initiate the genesis block
    this.createGenesisBlock();
    return false;
  }


  async addTransaction(transaction) {
  
      if(!transaction.fromAddress || !transaction.toAddress) {
        return ApiError.badRequest('Transaction must include from and to address');
      }

      const result = await transaction.isValid();  
      
      if (result.code) {
        return ApiError.badRequest(result.message);
      } 
      
      this.pendingTransactions.push(transaction);
      return true;
  }


  async isChainValid() {

    if(this.chain.length === 0) {
      await this.getChainLength();
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      const currentBlockInstance = new Block(
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash,
        currentBlock.hash,
        currentBlock.nonce
      );

      await currentBlockInstance.mineBlock(this.difficulty);
      if(!currentBlockInstance.hasValidTransaction()) return false;

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash !== currentBlockInstance.calculateHash()) {
        return false;
      }

    }
    return true;
  }



  // async checkChainValidity() {
  //   this.getChainLength();
  //       for (let i = 1; i < this.chain.length; i++) {
  //         const currentBlock = this.chain[i];
  //         const previousBlock = this.chain[i - 1];
  //         console.log('\n')
  //         console.log(`Validating Block(${i}): ${currentBlock.hash}`);
  //         recreate the block with the info from database
  //         const currentBlockInstance = new Block(currentBlock.timestamp, null, currentBlock.previousHash);
          
  //         if (currentBlock.previousHash !== previousBlock.hash) {
  //           console.log(`Stored hash(${currentBlock.hash}) and computed hash(${currentBlock.hash}) doesn't match`);
  //           return false;
  //         }
          
  //         console.log(`Block ${i} Hash validated: ${currentBlock.hash} -> SUCCESS`);
  //         console.log(currentBlockInstance.calculateHash());
  //         // check if tampered with
  //         // if (currentBlock.hash !== currentBlockInstance.calculateHash()) {
  //         //   console.log(`Hash invalid: ${currentBlockInstance.hash}`)
  //         //   return false;
  //         // }
                
  //     }
        
  //           // else {
  //           //     console.log(`Genesis Block(${idx}): ${entry.hash}`);
  //           //     previousBlock = new Block(entry.timestamp, entry.transactions, entry.previousHash, entry.hash, entry.nonce);
  //           //     previousBlock.mineBlock(this.difficulty);
  //           //     idx++;
  //           // }

  //     }




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
