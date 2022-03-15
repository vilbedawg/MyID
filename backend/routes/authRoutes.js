import express from "express";
import { loginUser, logoutUser, getRefresh } from "../controllers/authController.js";
import { registerUser } from "../controllers/registerController.js";
const authRouter = express.Router();

authRouter.route('/register').post(registerUser);

authRouter.route('/login').post(loginUser);

authRouter.route('/logout').post(logoutUser);

authRouter.route('/refresh').get(getRefresh);

export default authRouter;