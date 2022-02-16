import express from "express";
import block from "./models/block.model.js";
import { Block } from "./Block.js";
import { Blockchain } from "./Blockchain.js";

const router = express.Router();

router.route('/').get((req, res) => {
    block.find()
     .then(block => res.json(block))
     .catch(err => res.status(400).json('Error: ' + err))
});


export default router;