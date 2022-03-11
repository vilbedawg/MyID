import ApiError from "./ApiError.js";

export const apiErrorHandler = (err, req, res, next) => {
    // dont use in prod becuase console.trace is not async
    console.error(err)

    if (err instanceof ApiError) 
    {
        res.status(err.error).json({message: err.message});
        return;
    } 
    
    res.status(500).json('Something went wrong');
}