
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import userRoute from "./routes/user.routes.js";

const app = express();

app.use(express.json());



const options={
    origin:"http://localhost:5173",
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}

app.use(cors(options));

app.use(cookieParser());
app.use(morgan('dev'))

app.use('/ping', (req, res) => {
    res.send('/pong');
});

app.use('/api/v1/user', userRoute);

app.use(errorMiddleware);

// Routes of 3 modules
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 Page Not Found');
});


export default app;