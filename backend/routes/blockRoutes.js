import express from "express";
import { mineBlock, getBlockchain, checkValidation} from '../controllers/blockController.js';
const blocksRouter = express.Router();
import ROLES_LIST from "../config/roles_list.js";
import verifyRoles from "../middleware/permissionMiddleware.js";

// get all blocks from chain
blocksRouter.route('/blocks').get(getBlockchain);

// add a new block
blocksRouter.route('/blocks/add').post(verifyRoles(ROLES_LIST.Ajokortti, ROLES_LIST.Passi, ROLES_LIST.Kelakortti), mineBlock);

// check validation
blocksRouter.route('/blocks/check').get(checkValidation);


export default blocksRouter;