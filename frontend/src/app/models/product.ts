export interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  registeredBy?: { _id: string; name: string };
  category: string;
}
