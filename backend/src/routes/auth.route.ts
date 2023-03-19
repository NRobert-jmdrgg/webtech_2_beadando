import express from 'express';
import { signin } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyJWT';

const router = express.Router();

router.post('/signin', signin);
router.get('/protected', verifyToken, (req, res) => {
  res.send(`Welcome ${req.body.email}!`);
});
export default router;
