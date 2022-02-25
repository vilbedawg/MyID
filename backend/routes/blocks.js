import express from "express";
import { mineBlock } from '../controllers/blockController.js';
import { getBlockchain } from "../controllers/blockController.js";
const blocksRouter = express.Router();


//get all blocks from chain
blocksRouter.route('/blocks').get(getBlockchain);

// add a new block
blocksRouter.route('/blocks/add').post(mineBlock);

export default blocksRouter;