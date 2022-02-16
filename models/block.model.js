import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const block = new Schema({

    previousHash: {
        required: false,
        type: Schema.Types.String
    },
    timestamp: {
        required: true,
        type: Schema.Types.Date,
        default: Date.now()
    },
    transactions: {
        required: true,
        type: Schema.Types.Array
    },
    hash: {
        required: true,
        type: Schema.Types.String
    },
    nonce: {
        required: true,
        type: Schema.Types.Number
    }
});

export default mongoose.model('block', block);