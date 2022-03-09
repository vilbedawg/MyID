import express from "express";
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import { imageUpload } from "../controllers/imgController.js";
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './build/uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage })

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(getTransactions);

//add new transaction
transRouter.route('/transactions/add')
.post(upload.array("file"), imageUpload)
.post(addTransaction);


export default transRouter;