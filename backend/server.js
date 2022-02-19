import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv  from "dotenv"
import blocksRouter from "./routes/blocks.js";
import transRouter from "./routes/transactions.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Static Middleware 
app.use(express.static(path.join(__dirname + '/build')));
app.use(cors());
app.use(express.json());


// Database connection
dotenv.config();
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
connection.once('open', () => {
    console.log('MongoDB connection established.');
});

//router
app.use('/api', blocksRouter);
app.use('/api', transRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
