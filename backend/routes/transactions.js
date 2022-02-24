import express from "express";
import transaction  from '../models/transaction.model.js';
import {Transaction} from '../services/Block.js';
import { Blockchain } from "../services/Blockchain.js";
import CryptoJS from 'crypto-js';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');
const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get((req, res) => {
    transaction.find()
     .then(transaction => res.json(transaction))
     .catch(err => res.status(400).json('Error: ' + err))
});


//remove all transactions when mined
transRouter.route('/transactions/delete').post((req, res) => {
    transaction.deleteMany({})
    .then(() => res.json('Block has been mined'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//add new transaction
transRouter.route('/transactions/add').post((req, res) => {
    //new blockchain instance
    const BlockchainInstance = new Blockchain();

    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const data = req.body.data;

    //decrypt key
    const privateKey = req.body.cryptedKey;
    const bytes = CryptoJS.AES.decrypt(privateKey, 'secret key 1');
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

    //get keypair
    const key = ec.keyFromPrivate(decryptedKey);
    const myWalletAddress = key.getPublic('hex');

    //new transaction instance
    const newTx = new Transaction(fromAddress, toAddress, data);
    newTx.signTransaction(key);

    //transaction validation
    BlockchainInstance.addTransaction(newTx);

    // new model instance
    const newTransaction = new transaction({
        fromAddress: newTx.fromAddress,
        toAddress: newTx.toAddress,
        signature: newTx.signature,
        data: newTx.data,
        timestamp: newTx.timestamp,
    });

    
    newTransaction.save()
    .then(() => res.json('Transaction added to the block'))
    .catch(err => res.status(400).json('Error: ' + err));
});



export default transRouter;