import express from "express";
import { addTransaction, getViewedTransaction, getTransactions, transactionHandler } from '../controllers/transactionController.js';
import { imageUpload } from "../controllers/imgController.js";
import { upload } from "../services/multer.js";
import ROLES_LIST from "../config/roles_list.js";
import verifyRoles from "../middleware/permissionMiddleware.js";

const transRouter = express.Router();

//get all transactions from block
transRouter.route('/transactions').get(verifyRoles(ROLES_LIST.Ajokortti, ROLES_LIST.Passi, ROLES_LIST.Kelakortti), getTransactions);

transRouter.route('/transactions/:id').get(verifyRoles(ROLES_LIST.Ajokortti, ROLES_LIST.Passi, ROLES_LIST.Kelakortti), getViewedTransaction);


transRouter.route('/handle/:id/:bool')
.post(upload.none())
.post(verifyRoles(ROLES_LIST.Ajokortti, ROLES_LIST.Passi, ROLES_LIST.Kelakortti), transactionHandler);

//add new transaction
transRouter.route('/transactions/add')
.post(upload.array("file"), imageUpload)
.post(addTransaction);


export default transRouter;