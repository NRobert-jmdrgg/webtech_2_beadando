import { Request, Response } from 'express';
import Log from '../models/log';

export const getLogs = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await Log.find({}));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};
