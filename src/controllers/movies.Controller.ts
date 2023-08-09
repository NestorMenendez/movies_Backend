import { Request, Response } from 'express';
import prisma from '../db/clientPrisma';
import { uploadImage } from '../utils/cloudinary'

export const createMovie = async (req: Request, res: Response) => {

  const { userId } = req.params;

  //Customization of incoming data to db model
  let { title } = req.body;
  if (typeof title !== 'string') {
    title = title.toString()
  }
  let { genres } = req.body;
  if (!Array.isArray(genres)) {
    genres = [genres]
  }
  let { score } = req.body;
  if (typeof score !== 'number') {
    score = Number(score)
  }


  try {
    if (!title || !score || !genres) {
      return res.status(400).json({ error: 'Missing required input' });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Image is missing' });
    }
    const imageVerification = req.files.image

    if (imageVerification) {
      if ("tempFilePath" in imageVerification) {
        const uploadedImage = await uploadImage(imageVerification.tempFilePath);
        console.log(uploadImage)
      }
    }

    const newMovie = await prisma.movies.create({
      data: {
        title,
        score,
        genres: {
          connect: genres.map((genre: string) => ({ id: genre })),
        },
        Users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        genres: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).send(newMovie);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error creating movie' });
  }
};


export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movies.findMany();

    return res.status(200).json(movies);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving movies' });
  }
};


export const getOneMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  try {
    const movie = await prisma.movies.findUnique({
      where: {
        id: movieId
      }
    });

    return res.status(200).json(movie);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving movie' });
  }
};


export const updateMovie = async (req: Request, res: Response) => {

  const movieId = req.params.movieId;
  const { title, score, genres } = req.body;

  try {
    if (!title || !score || !genres) {
      return res.status(400).json({ error: 'Missing required input' });
    }

    const movieToUpdate = await prisma.movies.update({
      where: {
        id: movieId
      },
      data: {
        title,
        score,
        genres
      }
    })
    if (!movieToUpdate) {
      return res.status(404).json({ error: 'Movie not founded' });
    }

    return res.status(200).json(movieToUpdate);

  } catch (error) {
    return res.status(500).json({ error: 'Error updating movie' });
  }
};


export const deleteMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;

  try {

    const movieToDelete = await prisma.movies.delete({
      where: {
        id: movieId
      }
    });
    if (!movieToDelete) {
      return res.status(404).json({ error: 'Movie not found' });
    }


    return res.status(200).json({ message: `Movie Id: ${movieId} deleted` });

  } catch (error) {
    return res.status(500).json({ error: 'Error deleting movie' });
  }
};