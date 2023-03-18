import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser, addUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
