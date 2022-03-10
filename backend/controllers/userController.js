import block from "../models/block.model.js";
import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as EmailValidator from 'email-validator';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

export const getUserData = expressAsyncHandler(async (req, res) => {
  const UserData = await block
    .find(
      {
        transactions: {
          $elemMatch: {
            fromAddress: req.query.id,
            toAddress: req.query.type,
          },
        },
      },
      { transactions: 1, _id: 0 }
    )
    .sort({ $natural: -1 })
    .limit(1);

    let data = null;
    const dataArray = UserData[UserData.length - 1];
    if(dataArray === undefined) {
        throw ApiError.badRequest('User not found');
    }

    // search for last inserted document
    for await (const tx of dataArray.transactions) {
        if(tx.fromAddress === req.query.id) {
            data = tx;
            break;
        }
    }

    res.json(data);
  });


  export const registerUser = expressAsyncHandler(async (req, res) => {
    const {email, password } = req.body;

    if(!email || !password) {
      throw ApiError.badRequest("Please check all fields");
    }

    const validEmail = EmailValidator.validate(email);
    if(!validEmail) {
      throw ApiError.badRequest('Invalid email');
    }

    const userExist = await user.findOne({email});
    if(userExist) {
      throw ApiError.badRequest('User with that email already exists');
    }

    //pwd hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    //generate key pair
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    
    //create user
    const User = await user.create({
      email,
      password: hashedPassword,
      publicKey,
      privateKey
    });

    if (User) {
      res.status(201).json({
        _id: User.id,
        email: User.email,
        publicKey: User.publicKey,
        privateKey: User.privateKey,
        token: generateToken(User._id)
      });
    } else {
      throw ApiError.badRequest('Invalid User data');
    }
  });

  export const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const User = await user.findOne({email});

    if(User && (await bcrypt.compare(password.toString(), User.password))) {
      res.json({
        _id: User.id,
        email: User.email,
        publicKey: User.publicKey,
        privateKey: User.privateKey,
        token: generateToken(User._id)
      })
    } else {
      throw ApiError.badRequest('Invalid credentials')
    }
  });
  

  export const getMe = expressAsyncHandler(async (req, res) => {
    res.json({message: 'Get user data'});
  });


  export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  };

