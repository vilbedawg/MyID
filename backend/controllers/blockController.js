import expressAsyncHandler from "express-async-handler";
import block from "../models/block.model.js";
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import ROLES_LIST from "../config/roles_list.js";

export const mineBlock = expressAsyncHandler(async (req, res) => {
  // new blockchain instance
  if(!req.roles) return res.sendStatus(403);

  const BlockchainInstance = new Blockchain();
  const toAddress = Object.keys(ROLES_LIST).find(
    (role) => ROLES_LIST[role] == req.roles[1]
  );
 
  
  await BlockchainInstance.getChain();
  // push the transactions from db to pending transactions
  for await (const transaction of req.body.params.transactions) {
    BlockchainInstance.pendingTransactions.push(transaction);
  }

  const mineBlock = await BlockchainInstance.minePendingTransactions(toAddress);

  if (!mineBlock) {
    return res.sendStatus(500);
  }

  const minedBlock = BlockchainInstance.chain[BlockchainInstance.chain.length - 1];

  const newBlock = new block({
    previousHash: minedBlock.previousHash,
    timestamp: minedBlock.timestamp,
    transactions: minedBlock.transactions,
    hash: minedBlock.hash,
    nonce: minedBlock.nonce,
  });

  const saved = await newBlock.save({});
  if (saved) {
    return res.json({ message: `Korttien lisäys onnistui.` });
  } else {
    return res.sendStatus(500);
  }
});

export const getBlockchain = expressAsyncHandler(async (req, res) => {
  const Blockchain = await block.find({});
  res.json(Blockchain);
});

export const checkValidation = expressAsyncHandler(async (req, res) => {
  const BlockchainInstance = new Blockchain();
  await BlockchainInstance.getChain();
  // BlockchainInstance.chain[2].transactions[3].data.picture = 'asd';
  const result = await BlockchainInstance.isChainValid();
  const latest = await block.findOne({"transactions": {$elemMatch: { fromAddress: req.user }}}).sort({$natural: -1}).select('-password');
  let valid = true;
  let invalidResults = [];
  // for (let i = 0; i < result.invalidTransactions.length; i++) {
  //   const currentInvalid = result.invalidTransactions[i];
  //   console.log(latest)
  //   if (currentInvalid.fromAddress === req.user) {
  //     valid = false;
  
  //   }
  // }

  
  const map = result.invalidTransactions.map((obj, i) => {
    console.log(obj)
    const res = latest.transactions.filter(x => {
      x.fromAddress === obj.fromAddress && x.timestamp === obj.timestamp && x.toAddress === obj.toAddress;
    })
    
    if(res.length > 0) { 
      invalidResults.push({toAddress: obj.toAddress, valid: false});
    }

    return;
  });

  console.log(map)
  

  res.cookie("invalid_tx", invalidResults, {
    maxAge: 6.048e8, // 1 week
    secure: false,
    sameSite: true
  });

  res.sendStatus(200);
  
});

