import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const mongo_client = new MongoClient(process.env.MONGO_URI!);
mongo_client
  .connect()
  .then(() => {
    console.log('mongodb connected...');
  })
  .catch((error) => console.error(error));

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
