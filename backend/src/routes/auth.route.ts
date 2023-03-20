import express from 'express';
import { signin } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verifyJWT';

const router = express.Router();

router.post('/signin', signin);
router.post('/', verifyToken, (req, res) => {
  console.log('hello world');
  res.send(req.body.verified);
});
export default router;
