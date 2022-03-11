
import express from "express";
const userRouter = express.Router();
import { registerUser, getUserData, loginUser, getMe } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser)

userRouter.route('/user').get(protect, getUserData);

userRouter.route('/userdata').get(protect, getMe)

export default userRouter;