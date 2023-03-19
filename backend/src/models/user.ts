import { Types, Schema, Document, Model, model } from 'mongoose';

export interface IUser extends Document {
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

export interface IUserModel extends Model<IUser> {
  updateName(name: string): Promise<Document>;
  updatePassword(password: string): Promise<Document>;
  updateEmail(email: string): Promise<Document>;
  updatePhone(phone: string): Promise<Document>;
  findByEmail(email: string): Promise<IUser | null>;
  findByUserName(userName: string): Promise<IUser | null>;
  findByFullName(firstName: string, lastName: string): Promise<IUser[] | null>;
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
    methods: {
      updateName(name: string) {
        this.name = name;
        return this.save();
      },

      updatePassword(password: string) {
        this.password = password;
        return this.save();
      },

      updateEmail(email: string) {
        this.email = email;
        return this.save();
      },

      updatePhone(phone: string) {
        this.phone = phone;
        return this.save();
      },
    },

    statics: {
      findByEmail(email: string) {
        return this.findOne({ email: email });
      },

      findByUserName(userName: string) {
        return this.findOne({ name: userName });
      },

      findByFullName(firstName: string, lastName: string) {
        return this.find({ fistName: firstName, lastName: lastName });
      },
    },

    collection: 'users',
    timestamps: true,
  }
);

export default model<IUser, IUserModel>('User', userSchema);
