import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transaction = new Schema({

    fromAddress: {
        required: false,
        type: Schema.Types.String
    },
    toAddress: {
        required: false,
        type: Schema.Types.String
    },
    data: {
        required: true,
        type: Schema.Types.Array
    },
    timestamp: {
        required: true,
        type: Schema.Types.Date,
        default: Date.now()
    }
});

export default mongoose.model('transaction', transaction);