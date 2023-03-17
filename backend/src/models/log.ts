import { Types, Schema, Document, model, Model } from 'mongoose';

export interface ILog extends Document {
  user?: Types.ObjectId;
  action: string;
  product?: Types.ObjectId;
}

export interface ILogModel extends Model<ILog> {
  findByUser(user: Types.ObjectId): Promise<Document[] | null>;
  findByAction(action: string): Promise<Document[] | null>;
  findByProduct(product: Types.ObjectId): Promise<Document[] | null>;
}

const logSchema = new Schema<ILog>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    product: { type: Types.ObjectId, ref: 'Product' },
  },
  {
    statics: {
      findByUser(user: Types.ObjectId) {
        return this.find({ user: user });
      },
      findByAction(action: string) {
        return this.find({ action: action });
      },
      findByProduct(product: Types.ObjectId) {
        return this.find({ product: product });
      },
    },
    collection: 'logs',
    timestamps: true,
  }
);

export default model<ILog, ILogModel>('Log', logSchema);
