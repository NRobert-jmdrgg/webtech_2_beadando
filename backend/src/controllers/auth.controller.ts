import { Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await db.User.findByEmail(email);

  console.log('sign in was called');

  if (!foundUser) {
    res.status(401); //Unauthorized
    return;
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    res.status(401);
    return;
  }

  const payload: AuthPayload = {
    id: foundUser._id,
    email: foundUser.email,
    name: foundUser.name,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  };

  // create JWTs
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '60m',
  });

  foundUser.isLoggedIn = true;
  await foundUser.save();

  const expiresIn = new Date();

  res.json({ accessToken, exiresIn: expiresIn.setMinutes(expiresIn.getMinutes() + 60) });
};
