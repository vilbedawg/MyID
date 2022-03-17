import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import {connectDB} from './config/dbconfig.js'
import dotenv  from "dotenv"
import blocksRouter from "./routes/blockRoutes.js";
import transRouter from "./routes/transactionRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';
import { apiErrorHandler } from "./middleware/api-error-handler.js";
import authRouter from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import { corsOptions } from './config/corsOptions.js';
import { credentials } from './middleware/credentials.js';

dotenv.config();
connectDB();


const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(credentials);
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname + '/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//public routes
app.use('/', authRouter);

// private routes
app.use(protect);
app.use('/', userRouter);
app.use('/', blocksRouter);
app.use('/', transRouter);

app.use(apiErrorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
