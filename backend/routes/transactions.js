import express from "express";
import { addTransaction } from '../controllers/transactionController.js';


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
transRouter.route('/transactions/add').post(addTransaction);


export default transRouter;