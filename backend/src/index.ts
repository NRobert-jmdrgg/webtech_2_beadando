import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';
import productRouter from './routes/products.route';
import authRouter from './routes/auth.route';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200', // the frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // the HTTP methods to allow
    allowedHeaders: ['Content-Type', 'Authorization'], // the headers to allow
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI!, { dbName: 'registry' })
  .then(() => {
    console.log('mongodb connected');

    app.use('/users', userRouter);
    app.use('/products', productRouter);
    app.use('/auth', authRouter);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
