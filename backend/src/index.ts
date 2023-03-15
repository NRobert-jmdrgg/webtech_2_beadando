import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { Schema } from 'inspector';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('mongodb connected...');

    app.get('/', async (req: Request, res: Response) => {
      res.status(200).send('');
    });

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
