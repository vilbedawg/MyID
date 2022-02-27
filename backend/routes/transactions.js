import express from "express";
import { addTransaction, getTransactions } from '../controllers/transactionController.js';

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(getTransactions);

//add new transaction
transRouter.route('/transactions/add').post(addTransaction);


export default transRouter;