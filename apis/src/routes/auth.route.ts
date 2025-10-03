import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/logout', AuthMiddleware, authController.logOut);

export default router;