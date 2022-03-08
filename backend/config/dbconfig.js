
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {

        const uri = process.env.ATLAS_URI;
        const connection = mongoose.connection;
        mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
        connection.once('open', () => {
            console.log('MongoDB connection established.');
        });
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}