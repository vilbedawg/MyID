import express from "express";
import block from "../models/block.model.js";
import transaction  from '../models/transaction.model.js';
import { Blockchain } from "../services/Blockchain.js";
import { Transaction } from "../services/Block.js";
const blocksRouter = express.Router();

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

//get all blocks from chain
blocksRouter.route('/blocks').get((req, res) => {
    block.find()
     .then(block => res.json(block))
     .catch(err => res.status(400).json('Error: ' + err));
});




// add a new block
blocksRouter.route('/blocks/add').post( async (req, res) => {

    // new blockchain instance
    const BlockchainInstance = new Blockchain();
    await BlockchainInstance.getChainLength();
    const transactionList = req.body;


    for await (const transaction of transactionList ) {
        const TransactionInstance = new Transaction(
            transaction.fromAddress, 
            transaction.toAddress, 
            transaction.data, 
            transaction.signature
        );

        BlockchainInstance.addTransaction(TransactionInstance);
    }
    console.log('Starting the miner');
    await BlockchainInstance.minePendingTransactions(); // If response false, do something
    await BlockchainInstance.isChainValid();
    
    
    // const minedBlock = BlockchainInstance.chain[BlockchainInstance.chain.length - 1];
    // const newBlock = new block({
    //     previousHash: minedBlock.previousHash,
    //     timestamp: minedBlock.timestamp,
    //     transactions: minedBlock.transactions,
    //     hash: minedBlock.hash,
    //     nonce: minedBlock.nonce
    // });

    // await newBlock.save()
    // .then(res => console.log('Block added to the chain'))
    // .catch(err => res.status(400).json('Error: ' + err));

});

export default blocksRouter;