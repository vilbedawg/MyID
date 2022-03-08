import express from "express";
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import { imageUpload } from "../controllers/imgController.js";
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(getTransactions);

//add new transaction
transRouter.route('/transactions/add')
.post(upload.single("file"), addTransaction);


export default transRouter;