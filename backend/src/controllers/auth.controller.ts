import { Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('PASSWORD: ' + password);

  const foundUser = await db.User.findByEmail(email);

  if (!foundUser) {
    res.sendStatus(401); //Unauthorized
    return;
  }

  console.log('FOUND USER');
  console.log(JSON.stringify(foundUser, null, 2));

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    res.sendStatus(401);
    return;
  }

  // create JWTs
  const accessToken = jwt.sign({ email: foundUser.email }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '30s',
  });
  const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '1d',
  });

  // Saving refreshToken with current user
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken });
};

export const signout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await db.User.findByRefreshToken(refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
    return;
  }

  // Delete refreshToken in db
  foundUser.refreshToken = undefined;
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(204);
};
