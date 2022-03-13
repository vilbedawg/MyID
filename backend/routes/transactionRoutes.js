import express from "express";
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import { imageUpload } from "../controllers/imgController.js";
import { upload } from '../services/multer.js';

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(getTransactions);

//add new transaction
transRouter.route('/transactions/add')
.post(upload.array("file"), imageUpload)
.post(addTransaction);


export default transRouter;