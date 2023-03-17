import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

interface UserRequest extends Request {
  user?: IUser;
}

interface LoginRequest extends Request {
  email?: string;
  password?: string;
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    res.status(200).send(await User.find({}));
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const requireAuth = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication failed, token missing.' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed, token missing.' });
    }
    const decoded = jwt.verify(token, process.env.SECRET!) as DecodedToken;
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed, token invalid.' });
  }
};

export const loginUser = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ email }, process.env.SECRET!);

    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

export const registerUser = async (req: UserRequest, res: Response) => {
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
    const user = await User.findByIdAndDelete(id);

    res.status(200).send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};
