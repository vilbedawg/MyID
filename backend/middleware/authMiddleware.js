import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import user from "../models/user.model.js";
import ApiError from "./ApiError.js";

export const protect = expressAsyncHandler(async(req, res, next) => {
    let token = req.cookies.access_token;

    if(!token) {
        throw ApiError.forbidden('Not authorized. No token found');
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        
        // Get user from the token
        req.user = await user.findOne({publicKey: decoded.publicKey}).select('-password');

        next();
    } catch (error) {
        throw ApiError.unauthorized('Not authorized');
    }

})