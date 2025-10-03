import { Router } from 'express';
import usersController from '../controllers/users.controller';

const router = Router();

router.get(`/`, usersController.getUsers);
router.get(`/:id`, usersController.getUserById);
router.post(`/`, usersController.createUser);
router.put(`/:id`, usersController.updateUser);
router.delete(`/:id`, usersController.deleteUser);

export default router;