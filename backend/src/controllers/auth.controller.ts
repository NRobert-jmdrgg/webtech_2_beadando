import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email: email });

  console.log('sign in was called');

  if (!foundUser) {
    return res.status(401).send({ message: 'Nincs ilyen email cím' }); //Unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).send({ message: 'Hibás jelszó' });
  }

  const payload: AuthPayload = {
    id: foundUser._id.toString(),
    email: foundUser.email,
    name: foundUser.name,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  };

  // create JWTs
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '7d',
  });

  res.json({ accessToken });
};
