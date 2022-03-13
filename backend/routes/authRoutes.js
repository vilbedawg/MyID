import express from "express";
import { registerUser, loginUser, logoutUser, getRefresh } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.route('/register').post(registerUser);

authRouter.route('/login').post(loginUser);

authRouter.route('/logout').post(logoutUser);

authRouter.route('/refresh').get(getRefresh);

export default authRouter;