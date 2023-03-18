import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';

interface UserRequest extends Request {
  user?: IUser;
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await User.find({}));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const addUser = async (req: UserRequest, res: Response) => {
  try {
    const { email, password, name, phone, firstName, lastName } = req.body.user;
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
    res.status(201).send('User created');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).send(await User.findById(id));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const updateUser = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body.user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.save();
    res.status(200).send('User updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.status(200).send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};
