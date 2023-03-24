import express from 'express';

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  getProductsCount,
  getProductsFromLower,
  updateProduct,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/count', getProductsCount);
router.get('/:id', getProductsById);
router.get('/lower/:lower/:count', getProductsFromLower);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/add', addProduct);

export default router;
