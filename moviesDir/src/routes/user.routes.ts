import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/UserController';

const userRoutes = express.Router();

// Routes for getting all users, creating a new user, updating a user, and deleting a user
userRoutes.get('/', getAllUsers);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;