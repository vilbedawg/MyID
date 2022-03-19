import express from "express";
import { mineBlock, getBlockchain, checkValidation} from '../controllers/blockController.js';
const blocksRouter = express.Router();


// get all blocks from chain
blocksRouter.route('/blocks').get(getBlockchain);

// add a new block
blocksRouter.route('/blocks/add').post(mineBlock);

// check validation
blocksRouter.route('/blocks/check').get(checkValidation);


export default blocksRouter;