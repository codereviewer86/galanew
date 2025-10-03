import { db } from '../config/db';
import { User } from '../interfaces/users.interface';

const createUser = async (user: User) => {
  const { email, password } = user;

  try {
    const insertQuery = 'INSERT INTO db1.users (email, password) VALUES (?, ?)';
    const result = await db.pool.query(insertQuery, [email, password]);
    console.log('line 10', result);
    return result;
  } catch (error) {
    throw error;
  }
};

const findAllUser = async () => {
  try {
    const getAllUsersQuery = 'SELECT * from db1.users';
    const result = await db.pool.query(getAllUsersQuery);
    return result;
  } catch (error) {
    throw error;
  }
};

export default { createUser, findAllUser };
