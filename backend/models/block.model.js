import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const block = new Schema({

    previousHash: {
        required: false,
        type: Schema.Types.String
    },
    timestamp: {
        required: true,
        type: Schema.Types.Number
    },
    transactions: {
        required: false,
        type: Schema.Types.Mixed
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