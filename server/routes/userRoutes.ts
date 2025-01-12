import express from 'express';
import {
  login,
  protect,
  protectedRoute,
  signup,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.route('/protected').get(protect, protectedRoute);

export default router;
