import { app } from '../index';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
} from '../controllers/product.controller';

app.get('products/', getAllProducts);
app.get('products/:id', getProductsById);
app.post('products/:id/update/', updateProduct);
app.delete('products/:id/delete/', deleteProduct);
app.post('products/add/', addProduct);
