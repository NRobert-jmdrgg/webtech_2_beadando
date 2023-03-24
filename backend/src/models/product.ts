import { Types, Schema, Document, model, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  registeredBy?: Types.ObjectId;
  category: string;
}

export interface IProductModel extends Model<IProduct> {
  updateName(name: string): Promise<Document>;
  updateBrand(brand: string): Promise<Document>;
  increasePrice(plus: number): Promise<Document>;
  decreasePrice(minus: number): Promise<Document>;
  updateCategory(category: string): Promise<Document>;
  findByCategory(category: string): Promise<IProduct[] | null>;
  findByBrand(brand: string): Promise<IProduct[] | null>;
  findByName(name: string): Promise<IProduct[] | null>;
  findByBrandAndName(brand: string, name: string): Promise<IProduct[] | null>;
  findPriceLessThan(price: number): Promise<IProduct[] | null>;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    registeredBy: { type: Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
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
      findByBrandAndName(brand: string, name: string) {
        return this.find({ $and: [{ name: name }, { brand: brand }] });
      },
      findPriceLessThan(price: number) {
        return this.find({ price: { $lt: price } });
      },
    },

    collection: 'products',
    timestamps: true,
    strict: false,
  }
);

export default model<IProduct, IProductModel>('Product', productSchema);
