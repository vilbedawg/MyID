import express from "express";
import transaction  from '../models/transaction.model.js';
import { Transaction } from "../services/Block.js";
import { Blockchain } from "../services/Blockchain.js";

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get((req, res) => {
    transaction.find()
     .then(transaction => res.json(transaction))
     .catch(err => res.status(400).json('Error: ' + err))
});


//add new transaction
transRouter.route('/transactions/add').post((req, res) => {
    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const data = req.body.data;
    const timestamp = Date.now('dd/MM/yyyy');
    
    const newTransaction = new transaction({
        fromAddress,
        toAddress,
        data,
        timestamp,
    });

    newTransaction.save()
    .then(() => res.json('Transaction added to the block'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get by key

export default transRouter;