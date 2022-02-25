import transaction from "../models/transaction.model.js";
import { Transaction } from "../services/Block.js";
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import CryptoJS from "crypto-js";
import pkg from "elliptic";
import expressAsyncHandler from "express-async-handler";
const { ec: EC } = pkg;
const ec = new EC("secp256k1");

export const addTransaction = expressAsyncHandler(async (req, res, next) => {
  const cryptedKey = req.body.cryptedKey;
  const key = await getKey(cryptedKey);

  //new blockchain instance
  const BlockchainInstance = new Blockchain();
  const fromAddress = req.body.fromAddress;
  const toAddress = req.body.toAddress;
  const data = req.body.data;
  // form input error handling -------------------------//////////////////////////////////
  
    
  // new transaction instance
  const newTx = new Transaction(fromAddress, toAddress, data);
  const signedKey = await newTx.signTransaction(key);
  if (signedKey.code) {
    throw ApiError.badRequest(signedKey.message);
  }

  // transaction validation
  const transactionAdded = await BlockchainInstance.addTransaction(newTx);
  if (transactionAdded.code) {
    throw ApiError.badRequest(transactionAdded.message);
  }

  // new model instance
  const newTransaction = new transaction({
    fromAddress: newTx.fromAddress,
    toAddress: newTx.toAddress,
    signature: newTx.signature,
    data: newTx.data,
    timestamp: newTx.timestamp,
  });

  const saveTransaction = await newTransaction.save();
  if (saveTransaction) {
    res.json(
      `${saveTransaction.toAddress} added to the block. Please wait for it to be mined.`
    );
  }
});

const getKey = expressAsyncHandler(async (privateKey) => {
  try {
    // decrypt key
    const bytes = CryptoJS.AES.decrypt(privateKey, "secret key 1");
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

    //get keypair
    const key = ec.keyFromPrivate(decryptedKey);
    return key;
  } catch (error) {
    throw ApiError.internal(error);
  }
});
