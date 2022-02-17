import express from "express";
import block from "./models/block.model.js";
import transaction  from './models/transaction.model.js';


const router = express.Router();

router.route('/blocks').get((req, res) => {
    block.find()
     .then(block => res.json(block))
     .catch(err => res.status(400).json('Error: ' + err))
});

export default router;