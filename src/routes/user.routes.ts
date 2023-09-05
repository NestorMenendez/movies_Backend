import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getOneUserByMail,
  getOneUserByMailParams,
} from '../controllers/user.Controller';


const userRoutes = Router();

userRoutes
  .post('/', createUser)
  .get('/', getAllUsers)
  .get('/:userEmail', getOneUserByMailParams)
  .put('/:userId', updateUser)
  // .patch('/:userId/:movieId', toggleFavoritesMovies)
  .delete('/:userId', deleteUser);

export default userRoutes;