import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import user from "../models/user.model.js";
import ApiError from "./ApiError.js";

export const protect = expressAsyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from headers
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            // Get user from the token
            req.user = await user.findOne({publicKey: decoded.publicKey}).select('-password');
            
            next();
        } catch (error) {
            console.log(error);
            throw ApiError.unauthorized('Not authorized');
        }
    }

    if(!token) {
        throw ApiError.unauthorized('Not authorized, no token');
    }
})