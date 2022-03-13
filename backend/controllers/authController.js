import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as EmailValidator from 'email-validator';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest("Please check all fields");
  }

  const validEmail = EmailValidator.validate(email);
  if (!validEmail) {
    throw ApiError.badRequest("Invalid email");
  }

  const userExist = await user.findOne({ email });
  if (userExist) {
    throw ApiError.badRequest("User with that email already exists");
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
  });

  if (User) {
    const access_token = generateToken(
        User.publicKey,
        process.env.ACCESS_JWT_SECRET,
        "300s"
    );

    const refresh_token = generateToken(
        User.publicKey,
        process.env.REFRESH_JWT_SECRET,
        "7d"
    ); 

    res.cookie("access_token", access_token, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
    });
    res.cookie("refresh_token", refresh_token, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
    });

    res.status(200)
    .json({
        _id: User.id,
        email: User.email,
        publicKey: User.publicKey,
        privateKey: User.privateKey,
        message: "Rekisteröinti onnistui",
    });
  } else {
    throw ApiError.badRequest("Invalid User data");
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const User = await user.findOne({ email });

  if (User && (await bcrypt.compare(password.toString(), User.password))) {
    const access_token = generateToken(
      User.publicKey,
      process.env.ACCESS_JWT_SECRET,
      "300s"
    );
    const refresh_token = generateToken(
      User.publicKey,
      process.env.REFRESH_JWT_SECRET,
      "7d"
    ); 

    res.cookie("access_token", access_token, {
      maxAge: 300000, // 5 min
      httpOnly: true,
      secure: true,
    });
    res.cookie("refresh_token", refresh_token, {
      maxAge: 6.048e8, // 1 week
      httpOnly: true,
      secure: true,
    });
    res
      .status(200)
      .json({
        email: User.email,
        publicKey: User.publicKey,
        privateKey: User.privateKey,
        message: "Kirjautuminen onnistui",
      });
  } else {
    throw ApiError.badRequest("Käyttäjää ei löydy");
  }
});

export const logoutUser = expressAsyncHandler(async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      maxAge: 300000,
      secure: true
    })
    .clearCookie("refresh_token", {
      maxAge: 6.048e8,
      httpOnly: true,
      secure: true
    })
    .status(204)
    .json({ message: "Uloskirjautuminen onnistui" });
});

export const getRefresh = expressAsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    throw ApiError.forbidden("Token not found");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    req.user = await user.findOne({publicKey: decoded.publicKey}).select('-password');
    
    const { publicKey } = decoded;
    const accessToken = generateToken(
      publicKey,
      process.env.ACCESS_JWT_SECRET,
      "300s"
    );
    res.cookie("access_token", accessToken, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
      })
      .json({ accessToken });
  } catch (error) {
    throw ApiError.unauthorized("Invalid token");
  }
});

export const generateToken = (publicKey, secret, expires) => {
  return jwt.sign({ publicKey }, secret, {
    expiresIn: expires,
  });
};
