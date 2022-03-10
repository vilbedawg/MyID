
import express from "express";
const userRouter = express.Router();
import { registerUser, getUserData, loginUser, getMe } from '../controllers/userController.js'

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser)

userRouter.route('/user').get(getUserData);

userRouter.route('/userData').get(getMe)

export default userRouter;