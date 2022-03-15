import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const protect = expressAsyncHandler(async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.publicKey;
            next();
        }
    );
})