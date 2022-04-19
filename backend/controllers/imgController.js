import expressAsyncHandler from "express-async-handler";
import ApiError from "../middleware/ApiError.js";

export const imageUpload = expressAsyncHandler( async (req, res, next) => {
    
    if(!req.files[0]) {
        throw ApiError.badRequest('Select an image');
    }

    next();
});