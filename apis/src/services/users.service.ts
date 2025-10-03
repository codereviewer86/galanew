import { hash } from 'bcrypt';
import { HttpException } from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { UserModel } from '../models/users.model';
import userRepo from '../repo/user.repo';

const findAllUser = async () => {
  const users: User[] = await userRepo.findAllUser();
  return users;
};

const findUserById = async (userId: number) => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  return findUser;
};

const createUser = async (userData: User): Promise<User> => {
  try {
    const findUser: User = UserModel.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { ...userData, password: hashedPassword };

    const result = await userRepo.createUser(createUserData);
    console.log('line 28', result);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId: number, userData: User): Promise<User[]> => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  const hashedPassword = await hash(userData.password, 10);
  const updateUserData: User[] = UserModel.map((user: User) => {
    if (user.id === findUser.id) user = { ...userData, id: userId, password: hashedPassword };
    return user;
  });

  return updateUserData;
};

const deleteUser = async (userId: number): Promise<User[]> => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  const deleteUserData: User[] = UserModel.filter(user => user.id !== findUser.id);
  return deleteUserData;
};

export default { findAllUser, findUserById, createUser, updateUser, deleteUser };
