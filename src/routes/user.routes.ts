import {Router} from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser, 
  toggleFavoritesMovies} from '../controllers/user.Controller';

const userRoutes = Router();

userRoutes
  .post('/', createUser)
  .get('/', getAllUsers)
  .get('/:userId', getOneUser)
  .put('/:userId', updateUser)
  .patch('/:userId/:movieId', toggleFavoritesMovies)
  .delete('/:userId', deleteUser);

export default userRoutes;