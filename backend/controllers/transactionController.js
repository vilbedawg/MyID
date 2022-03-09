import transaction from "../models/transaction.model.js";
import { Transaction } from "../services/Block.js";
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import CryptoJS from "crypto-js";
import expressAsyncHandler from "express-async-handler";
import pkg from "elliptic";
const { ec: EC } = pkg;
const ec = new EC("secp256k1");


export const addTransaction = expressAsyncHandler(async (req, res, next) => {
  
  const cryptedKey = req.body.key;
  const key = getKey(cryptedKey);

  //new blockchain instance
  const BlockchainInstance = new Blockchain();
  const fromAddress = req.body.fromAddress;
  const toAddress = req.body.toAddress;
  const data = {
    name: req.body.name,
    birthday: req.body.bday,
    country: req.body.country,
    files: req.files
  }

  const timestamp = new Date().getTime();

  // form input error handling 
  if(!fromAddress) {
    throw ApiError.badRequest('Address required. Make sure you have a valid address');
  }

  // new transaction instance
  const newTx = new Transaction(fromAddress, toAddress, data, null, timestamp);
  const signedKey = await newTx.signTransaction(key);
  if (signedKey.code) {
    throw ApiError.badRequest(signedKey.message);
  }

  // transaction validation
  const isTransactionAdded = await BlockchainInstance.addTransaction(newTx);
  if (isTransactionAdded.code) {
    throw ApiError.badRequest(isTransactionAdded.message);
  }

  // new model instance
  const newTransaction = new transaction({
    fromAddress: newTx.fromAddress,
    toAddress: newTx.toAddress,
    signature: newTx.signature,
    data: newTx.data,
    timestamp: newTx.timestamp,
  });

  await newTransaction.save();
  res.send(`Transaction added to the block. Please wait for it to be mined.`);
});

const getKey = (privateKey) => {
    // decrypt key
    const bytes = CryptoJS.AES.decrypt(privateKey, "secret key 1");
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
    
    //get keypair
    const key = ec.keyFromPrivate(decryptedKey);
    return key;
};


// get all transactions
export const getTransactions = expressAsyncHandler(async (req, res, next) => {
    const transactions = await transaction.find({});
    res.json(transactions);
})
