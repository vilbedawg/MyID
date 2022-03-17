import expressAsyncHandler from "express-async-handler";
import block from "../models/block.model.js";
import transaction from "../models/transaction.model.js";
import { Blockchain } from "../services/Blockchain.js";
import ApiError from "../middleware/ApiError.js";
import ROLES_LIST from "../config/roles_list.js";

export const mineBlock = expressAsyncHandler(async (req, res) => {
  // new blockchain instance

  const BlockchainInstance = new Blockchain();
  const toAddress = Object.keys(ROLES_LIST).find(
    (role) => ROLES_LIST[role] == req.body.params.type
  );
  await BlockchainInstance.getChainLength();

  // push the transactions from db to pending transactions
  for await (const transaction of req.body.params.transactions) {
    BlockchainInstance.pendingTransactions.push(transaction);
  }

  const mineBlock = await BlockchainInstance.minePendingTransactions(toAddress);

  if (!mineBlock) {
    throw ApiError.internal("Jokin meni pieleen lisäyksen aikana");
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
  await BlockchainInstance.getChainLength();
  // BlockchainInstance.chain[1].transactions[1] = 200;
  const isValid = await BlockchainInstance.isChainValid();

  res.json(isValid);
});
