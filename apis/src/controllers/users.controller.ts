import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/users.interface';
import usersService from '../services/users.service';
import { userSchema } from '../validation/userSchema';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const findAllUsersData: User[] = await usersService.findAllUser();

    res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const findOneUserData: User = await usersService.findUserById(userId);

    res.status(200).json({ data: findOneUserData, message: 'findOne' });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: User = req.body;
    await userSchema.validate(userData);
    const createUserData = await usersService.createUser(userData);
    console.log('line 32', typeof createUserData);

    res.status(201).json({ data: createUserData, message: 'created' });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const userData: User = req.body;
    const updateUserData: User[] = await usersService.updateUser(userId, userData);

    res.status(200).json({ data: updateUserData, message: 'updated' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const deleteUserData: User[] = await usersService.deleteUser(userId);

    res.status(200).json({ data: deleteUserData, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
