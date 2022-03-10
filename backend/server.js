import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import {connectDB} from './config/dbconfig.js'
import dotenv  from "dotenv"
import blocksRouter from "./routes/blockRoutes.js";
import transRouter from "./routes/transactionRoutes.js";
import userRouter from "./routes/userRoutes.js";
import ApiError from './middleware/ApiError.js';
import { apiErrorHandler } from "./middleware/api-error-handler.js";

dotenv.config();
connectDB();


const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static Middleware 
app.use(express.static(path.join(__dirname + '/build')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
app.use('/', blocksRouter);
app.use('/', transRouter);
app.use('/', userRouter);

app.use(apiErrorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
