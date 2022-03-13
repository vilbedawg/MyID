import express from "express";
import { getUserData, getMe } from '../controllers/userController.js';
const userRouter = express.Router();


userRouter.route('/user').get(getUserData);

userRouter.route('/userdata').get(getMe)

export default userRouter;