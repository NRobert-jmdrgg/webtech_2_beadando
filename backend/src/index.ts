import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();
const port = process.env.PORT;

export const app: Express = express();

connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('mongodb connected...');

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
