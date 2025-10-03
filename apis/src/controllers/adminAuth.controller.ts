import { NextFunction, Request, Response } from 'express';
import { Admin } from '../interfaces/admin.interface';
import adminAuthService from '../services/adminAuth.service';
import { RequestWithAdmin } from '../interfaces/auth.interface';

const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminData: { email: string; password: string } = req.body;
    const { cookie, findAdmin } = await adminAuthService.login(adminData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findAdmin, message: 'admin login successful' });
  } catch (error) {
    next(error);
  }
};

const adminLogout = async (req: RequestWithAdmin, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminData: Admin = req.admin;
    const logOutAdminData: Admin = await adminAuthService.logout(adminData);

    res.setHeader('Set-Cookie', ['AdminAuthorization=; Max-age=0']);
    res.status(200).json({ data: logOutAdminData, message: 'admin logout successful' });
  } catch (error) {
    next(error);
  }
};

const getAdminProfile = async (req: RequestWithAdmin, res: Response, next: NextFunction): Promise<void> => {
  try {
    const adminData: Admin = req.admin;
    res.status(200).json({ data: adminData, message: 'admin profile' });
  } catch (error) {
    next(error);
  }
};

export default { adminLogin, adminLogout, getAdminProfile };
