import { Router } from 'express';
import adminAuthController from '../controllers/adminAuth.controller';
import AdminAuthMiddleware from '../middlewares/adminAuth.middleware';
import adminAuthService from '../services/adminAuth.service';

const router = Router();

// Admin login route
router.post('/login', adminAuthController.adminLogin);

// Admin logout route (protected)
router.post('/logout', AdminAuthMiddleware, adminAuthController.adminLogout);

// Get admin profile (protected)
router.get('/profile', AdminAuthMiddleware, adminAuthController.getAdminProfile);

// Create admin route (for initial setup - you might want to protect this or remove after setup)
router.post('/create', async (req, res, next) => {
  try {
    const adminData = req.body;
    const newAdmin = await adminAuthService.createAdmin(adminData);
    res.status(201).json({ data: newAdmin, message: 'Admin created successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
