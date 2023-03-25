import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';

interface UserRequest extends Request {
  user?: IUser;
}

const checkIfExsits = async (prop: { [x: string]: string }) => {
  try {
    const res = await User.find(prop);
    return res && res.length;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addUser = async (req: UserRequest, res: Response) => {
  try {
    const { email, password, name, phone, firstName, lastName } = req.body.user;

    if (await checkIfExsits({ email })) {
      return res.status(400).send({ message: 'email already in use!' });
    }

    if (await checkIfExsits({ name })) {
      return res.status(400).send({ message: 'username already in use!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      firstName,
      lastName,
      admin: false,
      isLoggedIn: false,
      registeredItems: [],
    });

    await user.save();
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};

export const getUserNameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred' });
  }
};
