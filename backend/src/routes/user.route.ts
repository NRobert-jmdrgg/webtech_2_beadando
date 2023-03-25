import express from 'express';
import { getUserNameById, addUser } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyJWT';

const router = express.Router();

router.post('/add', addUser);
router.get('/:id', [verifyToken], getUserNameById);

export default router;
