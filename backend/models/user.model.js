import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    publicKey: {
        type: String,
        required: [true, 'Please generate a key'],
        unique: true
    },
    privateKey: {
        type: String,
        required: [true, 'Please generate a key'],
        unique: true
    },
    refreshToken: {
        type: String
    }
},
{
    timestamps: true
});

export default mongoose.model('user', userSchema);