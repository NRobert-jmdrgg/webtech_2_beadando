import { Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await db.User.findByEmail(email);

  console.log('sign in was called');

  if (!foundUser) {
    res.sendStatus(401); //Unauthorized
    return;
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    res.sendStatus(401);
    return;
  }

  const payload = {
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

  // Saving refreshToken with current user
  foundUser.isLoggedIn = true;
  await foundUser.save();

  res.json({ accessToken });
};
