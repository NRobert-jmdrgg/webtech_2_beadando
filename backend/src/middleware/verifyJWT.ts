import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../controllers/auth.controller';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as AuthPayload;

    req.body.verified = !!decoded;

    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};
