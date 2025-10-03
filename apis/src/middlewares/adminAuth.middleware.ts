import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithAdmin } from '../interfaces/auth.interface';
import { SECRET_KEY } from '../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AdminAuthMiddleware = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['AdminAuthorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const adminId = verificationResponse.id;
      
      const findAdmin = await prisma.admin.findUnique({
        where: { id: adminId }
      });

      if (findAdmin && findAdmin.isActive) {
        // Remove password from admin object
        const { password, ...adminWithoutPassword } = findAdmin;
        req.admin = adminWithoutPassword as any;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token or admin deactivated'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default AdminAuthMiddleware;
