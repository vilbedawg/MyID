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

  const access_token = generateToken(
    publicKey,
    process.env.ACCESS_JWT_SECRET,
    "60s"
  );

  const refresh_token = generateToken(
    publicKey,
    process.env.REFRESH_JWT_SECRET,
    "7d"
  ); 

  //create user
  const User = await user.create({
    email,
    password: hashedPassword,
    publicKey,
    privateKey,
    refreshToken: refresh_token,
  });

  if (User) {

    res.cookie("access_token", access_token, {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
    });
    res.cookie("refresh_token", refresh_token, {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
    });

    res.status(200)
    .json({
        user: User,
        accessToken: access_token,
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
      "100s"
    );

    const refresh_token = generateToken(
      User.publicKey,
      process.env.REFRESH_JWT_SECRET,
      "7d"
    ); 

    const currentUser = await user.findOneAndUpdate({email}, {$set:{refreshToken: refresh_token}}, {new: true}).select('-password');
    
    res.cookie("refresh_token", refresh_token, {
      maxAge: 6.048e8, // 1 week
      httpOnly: true,
      secure: false,
    });

    res.status(200)
      .json({
        user: currentUser,
        accessToken: access_token,
        message: "Kirjautuminen onnistui",
      });

  } else {
    throw ApiError.badRequest("Käyttäjää ei löydy");
  }
});

export const logoutUser = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies.refresh_token;

  if (!cookie) return res.sendStatus(204);

  req.user = await user.findOne({refreshToken: cookie}).select('-password');
  if(!req.user) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false
    });
    return res.sendStatus(204);
  }

  await user.findOneAndUpdate({refreshToken: cookie}, {$set:{refreshToken: ''}}, {new: true})
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: false
  });
  res.sendStatus(204);
});


export const getRefresh = expressAsyncHandler(async (req, res) => {

  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return res.sendStatus(403);

  req.user = await user.findOne({refreshToken: refreshToken}).select('-password');

  if(!req.user) return res.sendStatus(401);

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_JWT_SECRET,
    (err, decoded) => {
      if(err || req.user.publicKey !== decoded.publicKey) return res.sendStatus(401);
      const accessToken = generateToken(
        decoded.publicKey,
        process.env.ACCESS_JWT_SECRET,
        "20s"
      );
      res.json({ accessToken });
    });
});


export const generateToken = (publicKey, secret, expires) => {
  return jwt.sign({ publicKey }, secret, {
    expiresIn: expires,
  });
};
