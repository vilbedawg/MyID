import expressAsyncHandler from "express-async-handler"
import block from "../models/block.model.js";
import transaction  from '../models/transaction.model.js';
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";



export const mineBlock = expressAsyncHandler( async (req, res) => {
    // new blockchain instance
    const BlockchainInstance = new Blockchain();
    await BlockchainInstance.getChainLength();

    // push the transactions from db to pending transactions
    for await (const transaction of req.body.transactions ) {
        BlockchainInstance.pendingTransactions.push(transaction);
    }


    const mineBlock = await BlockchainInstance.minePendingTransactions(req.body.fromAddress);
    
    if(!mineBlock) {
        throw ApiError.internal('Issue with mining, try again.');
    }

    const minedBlock = BlockchainInstance.chain[BlockchainInstance.chain.length - 1];

    const newBlock = new block({
        previousHash: minedBlock.previousHash,
        timestamp: minedBlock.timestamp,
        transactions: minedBlock.transactions,
        hash: minedBlock.hash,
        nonce: minedBlock.nonce
    });

    const miner = BlockchainInstance.pendingTransactions[0];
    const minerReward = new transaction({
        fromAddress: miner.fromAddress,
        toAddress: miner.toAddress,
        signature: miner.signature,
        data: miner.data,
        timestamp: miner.timestamp,
    });
    
    //save to blockchain (database)
    const saved = await newBlock.save({});
    if(saved) {
        await minerReward.save({});
        res.json({message:`Block successfully mined.`});
        return;
    } else {
        res.status(500).send({message: 'Something went wrong'});
        return;
    }
    
    
});


export const getBlockchain = expressAsyncHandler( async (req, res) => {
    const Blockchain = await block.find({});
    res.json(Blockchain);
});


export const checkValidation = expressAsyncHandler( async (req, res) => {
    const BlockchainInstance = new Blockchain();
    await BlockchainInstance.getChainLength();
    // BlockchainInstance.chain[1].transactions[1] = 200;
    const isValid = await BlockchainInstance.isChainValid();

    res.json(isValid);
})
