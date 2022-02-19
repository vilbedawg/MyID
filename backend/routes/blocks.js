import express from "express";
import block from "../models/block.model.js";
import transaction  from '../models/transaction.model.js';



const blocksRouter = express.Router();

//get all blocks from chain
blocksRouter.route('/blocks').get((req, res) => {
    block.find()
     .then(block => res.json(block))
     .catch(err => res.status(400).json('Error: ' + err))
});



// add a new block
blocksRouter.route('/blocks/add').post((req, res) => {

    const previousHash = req.body.previousHash;
    const timestamp = Date.now();
    const hash = req.body.hash;
    const nonce = req.body.nonce;
    const transactions = req.body.transactions;

    const newBlock = new block({
        previousHash,
        timestamp,
        transactions,
        hash,
        nonce,
    });

    newBlock.save()
    .then(() => res.json('Block added to the blockchain'))
    .catch(err => res.status(400).json('Error: ' + err));

    // delete all transactions from the table
});

export default blocksRouter;