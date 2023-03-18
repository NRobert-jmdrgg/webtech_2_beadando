import express from 'express';
import { signin, signout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/signin', signin);
router.post('/signout', signout);

export default router;
