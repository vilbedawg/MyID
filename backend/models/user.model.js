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
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Ajokortti: {
            type: Number
        },
        Passi: {
            type: Number
        },
        Kelakortti: {
            type: Number
        }
    }
},
{
    timestamps: true
});

export default mongoose.model('user', userSchema);