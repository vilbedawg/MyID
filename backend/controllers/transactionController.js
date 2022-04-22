import transaction from "../models/transaction.model.js";
import user from "../models/user.model.js";
import { Transaction } from "../services/Block.js";
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import ROLES_LIST from "../config/roles_list.js";
import pkg from "elliptic";
const { ec: EC } = pkg;
const ec = new EC("secp256k1");


export const addTransaction = expressAsyncHandler(async (req, res) => {
  console.log(req.body)
  const User = await user.findOne({publicKey : req.user});

  if(!User) return res.sendStatus(403);
  
  //Get keypair
  const key = ec.keyFromPrivate(User.privateKey);

  //new blockchain instance
  const BlockchainInstance = new Blockchain();
  const fromAddress = User.publicKey;
  const toAddress = req.body.Tyyppi;
  const timestamp = new Date().getTime();
  const userdata = {
    body: req.body,
    picture: req.files[0].filename,
  }

  // new transaction instance
  const newTx = new Transaction(fromAddress, toAddress, userdata, null, timestamp);
  await newTx.signTransaction(key);

  // transaction validation
  const isTransactionAdded = await BlockchainInstance.addTransaction(newTx);
  if (isTransactionAdded.error) {
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

  const saved = await newTransaction.save();
  if (saved) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
  
});

// get all transactions
export const getTransactions = expressAsyncHandler(async (req, res) => {
  if (!req.roles) return res.sendStatus(403);
  const toAddress = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] == req.roles[1]);
  const transactions = await transaction.find({toAddress}).sort({$natural: -1}).select('-password');

  // Check for duplicates... 
  // We only want the most recently added transaction
  const seen = new Set();
  const filteredArr = transactions.filter(el => {
    const duplicate = seen.has(el.fromAddress);
    seen.add(el.fromAddress);
    return !duplicate;
  });

  res.json(filteredArr);
})

export const getViewedTransaction = expressAsyncHandler(async (req, res) => {
  const role = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] === req.roles[1]);
  const data = await transaction.findOne({fromAddress: req.params.id, toAddress: role},{ '_id': false, '__v': false, 'password': false}).sort({$natural: -1});
  res.status(200).json(data);
});


export const transactionHandler = expressAsyncHandler(async (req, res) => {
  const toAddress = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] === req.roles[1]);
  const data = await transaction.findOne({fromAddress: req.params.id, toAddress}).sort({$natural:-1});

  if(!data) {
    return res.sendStatus(404);
  }

  let newData = {
    ...data.data.body,
    ...req.body
  }
  const saved = await transaction.updateOne(
    {
      _id: data._id, fromAddress: data.fromAddress
    }, 
    { 
      $set: 
      {
        "data.body" : newData, 
        accepted : req.params.bool
      }
    });

  if(saved) {
    res.status(200).json(data);
  } else {
    res.send('Something went wrong when saving').status(500);
  }
});