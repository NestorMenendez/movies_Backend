import express from 'express';
import {
    createMovie,
    getAllMoviesByUser,
    getOneMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movies.Controller';

const moviesRoutes = express.Router();

moviesRoutes
    .post('/:userEmail', createMovie)
    .get('/byUser/:userEmail', getAllMoviesByUser)
    .get('/:movieId', getOneMovie)
    .patch('/:movieId', updateMovie)
    .delete('/:movieId', deleteMovie);

export default moviesRoutes;