import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { Admin } from '../interfaces/admin.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { SECRET_KEY } from '../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createToken = (admin: Admin): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: admin.id };
  const expiresIn: number = 60 * 60 * 24; // 24 hours

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `AdminAuthorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/; SameSite=Strict;`;
};

const login = async (adminData: { email: string; password: string }): Promise<{ cookie: string; findAdmin: Admin }> => {
  const findAdmin = await prisma.admin.findUnique({
    where: { email: adminData.email }
  });

  if (!findAdmin) throw new HttpException(409, `Admin with email ${adminData.email} was not found`);
  
  if (!findAdmin.isActive) throw new HttpException(403, 'Admin account is deactivated');

  const isPasswordMatching: boolean = await compare(adminData.password, findAdmin.password);
  if (!isPasswordMatching) throw new HttpException(409, "Invalid password");

  const tokenData = createToken(findAdmin);
  const cookie = createCookie(tokenData);

  // Remove password from response
  const { password, ...adminResponse } = findAdmin;

  return { cookie, findAdmin: adminResponse as Admin };
}

const logout = async (adminData: Admin): Promise<Admin> => {
  const findAdmin = await prisma.admin.findUnique({
    where: { id: adminData.id }
  });

  if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

  // Remove password from response
  const { password, ...adminResponse } = findAdmin;
  return adminResponse as Admin;
}

const createAdmin = async (adminData: { email: string; password: string; name: string }): Promise<Admin> => {
  const findAdmin = await prisma.admin.findUnique({
    where: { email: adminData.email }
  });

  if (findAdmin) throw new HttpException(409, `Admin with email ${adminData.email} already exists`);

  const hashedPassword = await hash(adminData.password, 10);
  
  const createAdminData = await prisma.admin.create({
    data: {
      email: adminData.email,
      password: hashedPassword,
      name: adminData.name,
    }
  });

  // Remove password from response
  const { password, ...adminResponse } = createAdminData;
  return adminResponse as Admin;
}

export default { login, logout, createAdmin };
