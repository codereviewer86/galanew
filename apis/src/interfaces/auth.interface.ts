import { Request } from 'express';
import { User } from './users.interface';
import { Admin } from './admin.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestWithAdmin extends Request {
  admin: Admin;
}
