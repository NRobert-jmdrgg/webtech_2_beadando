import mongoose, { Mongoose } from 'mongoose';
import Log, { ILogModel } from './log';
import Product, { IProductModel } from './product';
import User, { IUserModel } from './user';
mongoose.Promise = global.Promise;

interface Db {
  mongoose: Mongoose;
  User: IUserModel;
  Product: IProductModel;
  Log: ILogModel;
}

const db: Db = {
  mongoose,
  User,
  Product,
  Log,
};

export default db;
