import express from 'express';
import {
    createMovie,
    getAllMovies,
    getOneMovie,
    updateMovie,
    deleteMovie } from '../controllers/movies.Controller';

const moviesRoutes = express.Router();

moviesRoutes
    .post('/', createMovie)
    .get('/', getAllMovies)
    .get('/:movieId', getOneMovie)
    .put('/:movieId', updateMovie)
    .delete('/:movieId', deleteMovie);

export default moviesRoutes;