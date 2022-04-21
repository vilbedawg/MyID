import { Block } from "./Block.js";
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


  async getChain() {
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


  async minePendingTransactions(toAddress) {
    let lastBlockInfo = await this.getLatestBlock();
    
    if(lastBlockInfo) { 
      // new block instance to add make a new block
      let currentBlockInfo = new Block(
        new Date().getTime(),
        this.pendingTransactions,
        lastBlockInfo.hash
      );

      await currentBlockInfo.mineBlock(this.difficulty);
      this.pendingTransactions = []; 
      this.chain.push(currentBlockInfo);

      // include the transactions in the block
      await transaction.deleteMany({toAddress});
      return true;
    }
    // if no previous block is found, initiate the genesis block
    await this.createGenesisBlock();
    return false;
  }


  async addTransaction(transaction) {
  
      if(!transaction.fromAddress || !transaction.toAddress) {
        throw ApiError.badRequest('Transaktion täytyy sisältää fromAddress ja toAddress');
      }

      const result = await transaction.isValid();  
      
      if(!result) {
        return ApiError.badRequest('Allekirjoitus ei ole kunnollinen');
      }
      
      this.pendingTransactions.push(transaction);
      return true;
  }


  async isChainValid() {

    if(this.chain.length === 0) {
      await this.getChain();
    }

    let invalidTransactions = [];
    let invalidBlocks = [];
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
      
     

      const checkTransactions = await currentBlockInstance.hasValidTransaction();

      if(checkTransactions.length > 0) {
        invalidTransactions.push(...checkTransactions);
      }

      if (previousBlock.hash !== currentBlock.previousHash) {
        invalidBlocks.push(currentBlock);
        continue;
      }

      if (currentBlock.hash !== currentBlockInstance.calculateHash()) {
        invalidBlocks.push(currentBlock);
        continue;
      }
    }
    const result = {
      invalidBlocks,
      invalidTransactions
    }
    return result;
  }


}
