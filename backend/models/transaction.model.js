import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transaction = new Schema({
    fromAddress: {
        required: false,
        type: Schema.Types.String,
        ref: 'user'
    },
    toAddress: {
        required: true,
        type: Schema.Types.String
    },
    signature: {
        required: false,
        type: Schema.Types.String
    },
    data: {
        required: true,
        type: Schema.Types.Mixed
    },
    timestamp: {
        required: true,
        type: Schema.Types.Number
    }
});

export default mongoose.model('transaction', transaction);