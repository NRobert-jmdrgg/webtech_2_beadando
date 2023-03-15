import { Types, Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  phone?: string;
  admin: boolean;
  isLoggedIn: boolean;
  lastLogInDate?: Date;
  registeredItems: Types.ObjectId[];
  firstName?: string;
  lastName?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    admin: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false, required: true },
    lastLogInDate: Date,
    registeredItems: [{ type: Types.ObjectId, ref: 'Product', default: [] }],
    firstName: String,
    lastName: String,
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

      toggleAdmin() {
        this.admin = !this.admin;
        return this.save();
      },

      addProductToFavorites(product: Types.ObjectId) {
        this.registeredItems.push(product);
        return this.save();
      },

      removeProductFromFavorites(product: Types.ObjectId) {
        this.registeredItems = this.registeredItems.filter((item) => item !== product);
        return this.save();
      },

      updateLoginDate() {
        this.lastLogInDate = new Date();
        return this.save();
      },
    },

    statics: {
      findByEmail(email: string) {
        return this.find({ email: email });
      },

      findByUserName(userName: string) {
        return this.find({ name: userName });
      },

      findByFullName(firstName: string, lastName: string) {
        return this.find({ fistName: firstName, lastName: lastName });
      },
    },

    virtuals: {
      fullName: {
        get(this: IUser): string {
          return this.firstName + ' ' + this.lastName;
        },
      },
    },

    collection: 'users',
    timestamps: true,
  }
);

export default new Model('User', userSchema);
