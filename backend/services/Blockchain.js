import { Block, Transaction } from "./Block.js";
import block from "../models/block.model.js";
import transaction from "../models/transaction.model.js";
import ApiError from '../middleware/ApiError.js';

export class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }


  async createGenesisBlock() {
    const genesis = new Block(new Date().getTime(), "Genesis Block", "0");
    console.log('Initializing Genesis block..');
    let genesisBlock = new block({
      previousHash: genesis.previousHash,
      timestamp: genesis.timestamp,
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
    return this.chain[0];
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
      const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward, null, new Date().getTime());
      this.pendingTransactions.push(rewardTx);
      return true;
    }
    // if no previous block is found, we initiate the genesis block
    await this.createGenesisBlock();
    return false;
  }


  async addTransaction(transaction) {
  
      if(!transaction.fromAddress || !transaction.toAddress) {
        throw ApiError.badRequest('Transaction must include from and to address');
      }

      const result = await transaction.isValid();  
      
      if (result.error) {
        throw ApiError.badRequest(result.message);
      } 

      if(!result) {
        return ApiError.badRequest('Signature is not valid');
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
      
      const hasValidTransactions = await currentBlockInstance.hasValidTransaction();
      
      if(!hasValidTransactions)  {
        console.log(`block ${i} transactions -----> INVALID`);
        return false;
      }
      console.log(`block ${i} transactions -----> VALID`);
      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash !== currentBlockInstance.calculateHash()) {
        return false;
      }

    }
    return true;
  }




  // turha, voi poistaa
  async getBalanceOfAddress(address) {
    let balance = 0;
    await this.getChainLength();
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
