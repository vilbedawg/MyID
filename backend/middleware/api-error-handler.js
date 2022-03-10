import ApiError from "./ApiError.js";

export const apiErrorHandler = (err, req, res, next) => {
    // dont use in prod becuase console.trace is not async
    console.error(err)

    if (err instanceof ApiError) 
    {
        res.status(err.code).json({message: err.message});
        return;
    } 
    
    res.status(500).json('Something went wrong');
}

// export const apiErrorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode ? res.statusCode : 500;
//     res.status(statusCode);

//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV ==='production' ? undefined :err.stack
//     });
//     console.log(err);
// }