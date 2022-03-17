import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";
import bcrypt from "bcryptjs";
import * as EmailValidator from 'email-validator';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');


export const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw ApiError.badRequest("Täytä kaikki kentät");
    }
  
    const validEmail = EmailValidator.validate(email);
    if (!validEmail) {
      throw ApiError.badRequest("Syötä kunnollinen sähköposti");
    }
  
    const userExist = await user.findOne({ email });
    if (userExist) {
      throw ApiError.badRequest("Sähköposti on jo käytössä");
    }
  
    //pwd hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);
  
    //generate key pair
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");
  
  
    //create user
    const User = await user.create({
      email,
      password: hashedPassword,
      publicKey,
      privateKey,
      refreshToken: ''
    });
  
    if (User) {
    
      res.status(201)
      .json({
          user: User,
          message: "Rekisteröinti onnistui",
      });
  
    } else {
      throw ApiError.badRequest("Jokin meni pieleen");
    }
  });