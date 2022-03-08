import expressAsyncHandler from "express-async-handler"
import block from "../models/block.model.js";
import transaction  from '../models/transaction.model.js';
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import { json } from "express";

export const mineBlock = expressAsyncHandler( async (req, res, next) => {
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
    await newBlock.save({});
    await minerReward.save({});
    res.json(`Block successfully mined.`);
});


export const getBlockchain = expressAsyncHandler( async (req, res, next) => {
    const Blockchain = await block.find({});
    res.json(Blockchain);
});


export const checkValidation = expressAsyncHandler( async (req, res, next) => {
    const BlockchainInstance = new Blockchain();
    await BlockchainInstance.getChainLength();
    // BlockchainInstance.chain[1].transactions[1] = 200;
    const isValid = await BlockchainInstance.isChainValid();

    res.json(isValid);
})


export const getUserData = expressAsyncHandler(async (req, res, next) => {
  const UserData = await block
    .find(
      {
        transactions: {
          $elemMatch: {
            fromAddress: req.query.id,
            toAddress: req.query.type,
          },
        },
      },
      { transactions: 1, _id: 0 }
    )
    .sort({ $natural: -1 })
    .limit(1);

    let data = null;
    const dataArray = UserData[UserData.length - 1];
    if(dataArray === undefined) {
        throw ApiError.badRequest('User not found');
    }

    // search for last inserted document
    for await (const tx of dataArray.transactions) {
        if(tx.fromAddress === req.query.id) {
            data = tx;
            break;
        }
    }

    res.json(data);
});
