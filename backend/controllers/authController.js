import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginUser = expressAsyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const User = await user.findOne({ email });

  if (User && (await bcrypt.compare(password.toString(), User.password))) {
    const roles = Object.values(User.roles);
    const access_token = jwt.sign(
      { 
        "UserInfo": {
          publicKey: User.publicKey,
          roles: roles
        }
      }, 
      process.env.ACCESS_JWT_SECRET, 
      { expiresIn: '300s' }
    );

    const refresh_token = jwt.sign(
      { publicKey: User.publicKey }, 
      process.env.REFRESH_JWT_SECRET, 
      { expiresIn: '7d' }
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

  const foundUser = await user.findOne({refreshToken: cookie}).select('-password');
  if(!foundUser) {
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

  const foundUser = await user.findOne({refreshToken: refreshToken}).select('-password');

  if(!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_JWT_SECRET,
    (err, decoded) => {
      if(err || foundUser.publicKey !== decoded.publicKey) return res.sendStatus(401);
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        { 
          "UserInfo": {
            publicKey: decoded.publicKey,
            roles: roles
          }
        }, 
        process.env.ACCESS_JWT_SECRET, 
        { expiresIn: '300s' }
      );
      res.json({ accessToken });
    });
});

