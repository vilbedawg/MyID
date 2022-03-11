import expressAsyncHandler from "express-async-handler";
import ApiError from "../middleware/ApiError.js";

export const imageUpload = expressAsyncHandler( async (req, res, next) => {
    
    // if(!req.files[0] && !req.files[1]) {
    //     throw ApiError.badRequest('Select an image');
    // }

    next();
});