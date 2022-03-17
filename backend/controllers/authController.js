import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const loginUser = expressAsyncHandler(async (req, res) => {

  const { email, password } = req.body;
  const User = await user.findOne({ email });

  if(!email || !password) {
    throw ApiError.badRequest('Sähköposti tai salasana puuttuu')
  }

  if (User && (await bcrypt.compare(password.toString(), User.password))) {
    const roles = Object.values(User.roles).filter(Boolean);
    console.log(roles)
    const access_token = jwt.sign(
      { 
        "UserInfo": {
          publicKey: User.publicKey,
          roles: roles
        }
      }, 
      process.env.ACCESS_JWT_SECRET, 
      { expiresIn: '1h' }
    );

    const refresh_token = jwt.sign(
      { publicKey: User.publicKey }, 
      process.env.REFRESH_JWT_SECRET, 
      { expiresIn: '1d' }
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
        roles: roles,
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

  foundUser.refreshToken = '';
  await foundUser.save();

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: false
  });

  res.sendStatus(204);
});


export const getRefresh = expressAsyncHandler(async (req, res) => {

  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) return res.sendStatus(401);

  const foundUser = await user.findOne({refreshToken: refreshToken}).select('-password');

  if(!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_JWT_SECRET,
    (err, decoded) => {
      if(err || foundUser.publicKey !== decoded.publicKey) return res.sendStatus(403);
      const roles = Object.values(foundUser.roles).filter(Boolean);
      const accessToken = jwt.sign(
        { 
          "UserInfo": {
            publicKey: decoded.publicKey,
            roles: roles
          }
        }, 
        process.env.ACCESS_JWT_SECRET, 
        { expiresIn: '1h' }
      );
      res.json({ roles, accessToken });
    });
});

