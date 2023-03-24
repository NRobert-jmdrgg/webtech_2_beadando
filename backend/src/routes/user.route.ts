import express from 'express';
import { deleteUser, getAllUsers, getUserNameById, updateUser, addUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/add', addUser);
router.get('/:id', getUserNameById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
