import expressAsyncHandler from "express-async-handler"
import block from "../models/block.model.js";
import transaction  from '../models/transaction.model.js';
import { Blockchain } from "../services/Blockchain.js";
import { Transaction } from "../services/Block.js";
import ApiError from "../middleware/ApiError.js";

export const mineBlock = expressAsyncHandler( async (req, res, next) => {
    console.log(req.body.fromAddress);
    // new blockchain instance
    const BlockchainInstance = new Blockchain();
    await BlockchainInstance.getChainLength();

    // push the transactions from db to pending transactions
    for await (const transaction of req.body.transactions ) {
        BlockchainInstance.pendingTransactions.push(transaction);
    }


    await BlockchainInstance.minePendingTransactions(req.body.fromAddress);
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
    
    const saveToDB = await newBlock.save({});
    if (saveToDB) {
        await minerReward.save({});
        res.json(`Block successfully mined.`);
    }
});


export const getBlockchain = expressAsyncHandler( async (req, res, next) => {
    const Blockchain = await block.find({});
    res.json(Blockchain);
});