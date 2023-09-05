import express from 'express';
import {
    getAllMovies,
} from '../controllers/moviesPublic.Controller';

const moviesPublicRoutes = express.Router();

moviesPublicRoutes
    .get('/', getAllMovies)
export default moviesPublicRoutes;