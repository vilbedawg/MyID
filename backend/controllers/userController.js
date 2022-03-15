import block from "../models/block.model.js";
import user from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler"
import ApiError from "../middleware/ApiError.js";


export const getUserData = expressAsyncHandler(async (req, res) => {
  const foundUser = await user.findOne({publicKey: req.user}).select('-password');
  const UserData = await block
    .find(
      {
        transactions: {
          $elemMatch: {
            fromAddress: foundUser.publicKey,
            toAddress: req.query.type,
          },
        },
      },
      { transactions: 1, _id: 0 }
    )
    .sort({ $natural: -1 })
    .limit(1);
    let data = null;
    const dataArray = UserData[UserData.length - 1];
    if(dataArray === undefined) {
        throw ApiError.badRequest('Käyttäjää ei löydy');
    }

    // search for last inserted document
    for await (const tx of dataArray.transactions) {
        if(tx.fromAddress === req.user.publicKey) {
            data = tx;
            break;
        }
    }
    
    res.json({transaction: data});
});


export const getMe = expressAsyncHandler(async (req, res) => {
  const data = await user.findOne({publicKey: req.user}).select('-password');
  res.status(200).json(data);
});


