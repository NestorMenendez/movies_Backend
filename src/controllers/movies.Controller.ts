import { Request, Response } from 'express';
import MoviesModel from '../model/movies.model';
import { moviesDelete } from '../utils/movies.delete';


export const createMovie = async (req: Request, res: Response) => {
  const {title, poster_image, score, genre} = req.body;
    try{
      if(!title || !poster_image || !score || !genre){
        return res.status(400).json({error:'Missing required input'})
      }
      const newMovie = await MoviesModel.create({
        title,
        poster_image,
        score,
        genre
      })

    return res.status(201).send(newMovie);
    
    }catch (error) {
      return res.status(500).json({error: 'Error creating movie'});
    }
};


export const getAllMovies = async (req: Request, res: Response) => {
  try{
    const movies = await MoviesModel.find();

  return res.status(200).json(movies);

  }catch (error) {
    return res.status(500).json({ error: 'Error retrieving movies' });
  }
};


export const getOneMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  try{
    const movie = await MoviesModel.findById(movieId);

  return res.status(200).json(movie);

  }catch (error) {
    return res.status(500).json({ error: 'Error retrieving movie' });
  }
};


export const updateMovie = async (req: Request, res: Response) => {

  const movieId = req.params.movieId;
  const {title, poster_image, score, genre} = req.body;

  try{
    if (!title || !poster_image || !score || !genre){
      return res.status(400).json({ error: 'Missing required input' });
    }

    const movieToUpdate = await MoviesModel.findByIdAndUpdate(movieId, {title, poster_image, score, genre}, {new: true})
    if (!movieToUpdate){
      return res.status(404).json({error: 'Movie not founded'});
    }

  return res.status(200).json(movieToUpdate);

  }catch (error) {
    return res.status(500).json({ error: 'Error updating movie' });
  }
};


export const deleteMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;

  try{
    moviesDelete(movieId);

    const movieToDelete = await MoviesModel.findByIdAndDelete(movieId);
    if (!movieToDelete){
      return res.status(404).json({error: 'Movie not found'});
    }


  return res.status(200).json({message: `Movie Id: ${movieId} deleted`});

  }catch (error) {
    return res.status(500).json({error: 'Error deleting movie'});
  }
};