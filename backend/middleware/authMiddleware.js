import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.UserInfo.publicKey;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
})