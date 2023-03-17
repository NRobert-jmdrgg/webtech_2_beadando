import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import userRouter from './routes/user.route';
import productRouter from './routes/products.route';

dotenv.config();
const port = process.env.PORT;

const app: Express = express();

connect(process.env.MONGO_URI!, { dbName: 'registry' })
  .then(() => {
    console.log('mongodb connected...');

    app.use(express.json());

    app.use('/users', userRouter);
    app.use('/products', productRouter);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
