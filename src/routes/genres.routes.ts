import {Router} from 'express';
import {
  createGenre,
  getAllGenres,
  getOneGenre,
  updateGenre,
  deleteGenre} from '../controllers/genres.Controller';

const genresRoutes = Router();

genresRoutes
  .post('/', createGenre)
  .get('/', getAllGenres)
  .get('/:genreId', getOneGenre)
  .put('/:genreId', updateGenre)
  .delete('/:genreId', deleteGenre);

export default genresRoutes;