import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} from '../controllers/user.Controller';

// toggleFavoritesMovies

const userRoutes = Router();

userRoutes
  .post('/', createUser)
  .get('/', getAllUsers)
  .get('/:userId', getOneUser)
  .put('/:userId', updateUser)
  // .patch('/:userId/:movieId', toggleFavoritesMovies)
  .delete('/:userId', deleteUser);

export default userRoutes;