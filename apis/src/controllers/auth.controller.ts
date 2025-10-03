import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import authService from '../services/auth.service';
import { RequestWithUser } from '../interfaces/auth.interface';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: User = req.body;
    const signUpUserData: User = await authService.signup(userData);

    res.status(201).json({ data: signUpUserData, message: 'signup' });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: User = req.body;
    const { cookie, findUser } = await authService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findUser, message: 'login' });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: User = req.user;
    const logOutUserData: User = await authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: logOutUserData, message: 'logout' });
  } catch (error) {
    next(error);
  }
};

export default { signUp, logIn, logOut }