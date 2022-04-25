import transaction from "../models/transaction.model.js";
import user from "../models/user.model.js";
import { Transaction } from "../services/Block.js";
import { Blockchain } from "../services/Blockchain.js";
import expressAsyncHandler from "express-async-handler";
import ROLES_LIST from "../config/roles_list.js";
import pkg from "elliptic";
const { ec: EC } = pkg;
const ec = new EC("secp256k1");


export const addTransaction = expressAsyncHandler(async (req, res) => {
  const User = await user.findOne({publicKey : req.user});

  if(!User) return res.sendStatus(403);


  //Get keypair
  const key = ec.keyFromPrivate(User.privateKey);

  //new blockchain instance
  const BlockchainInstance = new Blockchain();
  const fromAddress = User.publicKey;
  const toAddress = req.body.Tyyppi;
  const timestamp = new Date().getTime();
  const body = req.body;
  body.picture = req.files[0].filename;
  // new transaction instance
  const newTx = new Transaction(fromAddress, toAddress, body, null, timestamp);
  await newTx.signTransaction(key);

  // transaction validation
  await BlockchainInstance.addTransaction(newTx);
 
  // new model instance
  const newTransaction = new transaction({
    fromAddress: newTx.fromAddress,
    toAddress: newTx.toAddress,
    signature: newTx.signature,
    data: newTx.data,
    timestamp: newTx.timestamp,
  });

  // check if the user has already submitted transaction that is waiting 
  // to be handled, then delete the old one
  const hasTransaction = await transaction.find({fromAddress: User.publicKey, toAddress});

  if(hasTransaction) {
    await transaction.deleteMany({fromAddress: User.publicKey, toAddress});
  }


  const saved = await newTransaction.save();
  if (saved) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
  
});

// get all transactions
export const getTransactions = expressAsyncHandler(async (req, res) => {
  if (!req.roles[1]) return res.sendStatus(403);
  const toAddress = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] == req.roles[1]);
  const transactions = await transaction.find({toAddress}).limit(10).select('-password');
  res.json(transactions)
});

export const getViewedTransaction = expressAsyncHandler(async (req, res) => {
  const role = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] === req.roles[1]);
  const data = await transaction.findOne({fromAddress: req.params.id, toAddress: role},{ '_id': false, '__v': false, 'password': false}).sort({$natural: -1});
  res.status(200).json(data);
});


export const transactionHandler = expressAsyncHandler(async (req, res) => {
  const type = Object.keys(ROLES_LIST).find(role => ROLES_LIST[role] === req.roles[1]);
  const oldTx = await transaction.findOne({fromAddress: req.params.id, toAddress: type}).sort({$natural:-1});
  const User = await user.findOne({publicKey: req.params.id});
 
  if(!User || !oldTx) return res.sendStatus(404);
  
  const {fromAddress, toAddress, timestamp } = oldTx;
  const newData = {
    ...oldTx.data,
    ...req.body
  }
  
  const newTx = new Transaction(fromAddress, toAddress, newData, null, timestamp);

  const key = ec.keyFromPrivate(User.privateKey);
  await newTx.signTransaction(key);

  const saved = await transaction.updateOne(
    {
      _id: oldTx._id, fromAddress: oldTx.fromAddress
    }, 
    { 
      $set: 
      {
        signature: newTx.signature,
        data : newTx.data, 
        accepted : req.params.bool
      }
    });

  if(saved) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});