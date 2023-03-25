import express from 'express';

import {
  addProduct,
  deleteProduct,
  getProductsById,
  getProductsCount,
  getProductsFromLower,
  updateProduct,
} from '../controllers/product.controller';
import { verifyToken } from '../middleware/verifyJWT';

const router = express.Router();

router.get('/count', [verifyToken], getProductsCount);
router.get('/:id', [verifyToken], getProductsById);
router.get('/lower/:lower/:count', [verifyToken], getProductsFromLower);
router.put('/:id', [verifyToken], updateProduct);
router.delete('/:id', [verifyToken], deleteProduct);
router.post('/add', [verifyToken], addProduct);

export default router;
