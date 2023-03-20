export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  registeredBy?: string;
  category: string;
}
