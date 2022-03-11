import express from "express";
import { addTransaction, getTransactions } from '../controllers/transactionController.js';
import { imageUpload } from "../controllers/imgController.js";
import { protect } from "../middleware/authMiddleware.js";
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
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
 });

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(protect, getTransactions);

//add new transaction
transRouter.route('/transactions/add')
.post(protect, upload.array("file"), imageUpload)
.post(protect, addTransaction);


export default transRouter;