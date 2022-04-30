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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//public routes
app.use('/auth/', authRouter);

// private routes
app.all('/api/*', protect);
app.use('/api/', userRouter);
app.use('/api/', blocksRouter);
app.use('/api/', transRouter);
app.use(apiErrorHandler);

app.use(express.static(path.join(__dirname, '/build')));

if(process.env.NODE_ENV === "production") {
    
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => 
    res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        ))
        
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
