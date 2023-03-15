import { Types, Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand?: string;
  price: number;
  registeredBy?: Types.ObjectId;
  category?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: String,
    price: { type: Number, required: true, default: 0 },
    registeredBy: { type: Types.ObjectId, ref: 'User', required: true },
    category: String,
  },
  {
    methods: {
      updateName(name: string) {
        this.name = name;
        this.save();
      },
      updateBrand(brand: string) {
        this.brand = brand;
        this.save();
      },
      increasePrice(plus: number) {
        this.price += plus;
        this.save();
      },
      decreasePrice(minus: number) {
        if (this.price - minus > 0) {
          this.price -= minus;
          this.save();
        }
      },
      updateCategory(category: string) {
        this.category = category;
        this.save();
      },
    },

    statics: {
      findByCategory(category: string) {
        return this.find({ category: category });
      },
      findByBrand(brand: string) {
        return this.find({ brand: brand });
      },
      findByName(name: string) {
        return this.find({ name: name });
      },
      findPriceLessThan(price: number) {
        return this.find({ price: { $lt: price } });
      },
    },

    collection: 'products',
    timestamps: true,
  }
);

export default new Model('Product', productSchema);
