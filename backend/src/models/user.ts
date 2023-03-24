import { Types, Schema, Document, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  password: string;
  email: string;
  phone?: string;
  isLoggedIn: boolean;
  lastLogInDate?: Date;
  registeredItems: Types.ObjectId[];
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    registeredItems: [{ type: Types.ObjectId, ref: 'Product', default: [] }],
    firstName: String,
    lastName: String,
    refreshToken: String,
  },
  {
    collection: 'users',
    timestamps: true,
    strict: false,
  }
);

export default model<IUser>('User', userSchema);
