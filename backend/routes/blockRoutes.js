import express from "express";
import { mineBlock, getBlockchain, checkValidation} from '../controllers/blockController.js';
import { protect } from "../middleware/authMiddleware.js";
const blocksRouter = express.Router();


// get all blocks from chain
blocksRouter.route('/blocks').get(protect, getBlockchain);

// add a new block
blocksRouter.route('/blocks/add').post(protect, mineBlock);

// check validation
blocksRouter.route('/blocks/check').get(protect, checkValidation);

export default blocksRouter;