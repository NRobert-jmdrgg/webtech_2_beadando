import express from 'express';
import {
  loginUser,
  requireAuth,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  registerUser,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/protected', requireAuth);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
