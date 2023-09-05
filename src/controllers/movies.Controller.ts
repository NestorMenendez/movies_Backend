import { Request, Response } from 'express';
import prisma from '../db/clientPrisma';
import { uploadImage } from '../utils/cloudinary'
import fs from 'fs-extra';
import { getOneUserByMail } from './user.Controller';

export const createMovie = async (req: Request, res: Response) => {

  const { userEmail } = req.params;
  const userId = await getOneUserByMail(userEmail);

  let { title, genres, score } = req.body;

  console.log(title)
  console.log(score)
  console.log(genres)

  //Customization of incoming data to db model
  if (typeof title !== 'string') title = title.toString() //TOFIX crear función que reciba tipos de variable y los convierta.
  // if (typeof genres === 'string') genres = Array.from(genres.split(','));
  if (typeof score !== 'number') score = Number(score)

  let uploadedPublicId = '';
  let uploadedSecureUrl = '';

  try {
    if (!title || !score || !genres) {
      return res.status(400).json({ error: 'Missing required input' });
    }
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Image is missing' });
    }

    const imageVerification = req.files.image
    if ("tempFilePath" in imageVerification) {

      const uploadedImage = await uploadImage(imageVerification.tempFilePath);

      uploadedPublicId = uploadedImage.public_id;
      uploadedSecureUrl = uploadedImage.secure_url;

      await fs.unlink(imageVerification.tempFilePath);

    }

    const newMovie = await prisma.movies.create({
      data: {
        title,
        score,
        genres: {
          connect: {
            id: genres
          },
        },
        users: {
          connect: {
            id: userId,
          },
        },
        image: {
          create: {
            public_id: uploadedPublicId,
            secure_url: uploadedSecureUrl
          }
        }
      },
      include: {
        genres: true,
        image: {
          select: {
            public_id: true,
            secure_url: true
          }
        }
      },
    });

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        moviesFav: {
          connect: {
            id: newMovie.id,
          },
        },
      },
    });

    return res.status(200).send(newMovie);
  } catch (error: any) {
    return res.status(500).json({ error: 'Error creating movie', details: error.message });
  }
};


export const getAllMoviesByUser = async (req: Request, res: Response) => {

  const userEmail = req.params.userEmail;
  const userId = await getOneUserByMail(userEmail);

  try {
    const movies = await prisma.users.findUnique({
      where: {
        id: userId
      },
      include: {
        moviesFav: {
          select: {
            id: true,
            title: true,
            score: true,
            image: {
              select: {
                secure_url: true,
                public_id: true,
              }
            },
            genres: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });
    return res.status(200).json(movies?.moviesFav);
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
      },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    }
    );

    return res.status(200).json(movie);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving movie' });
  }
};


export const updateMovie = async (req: Request, res: Response) => {

  const movieId = req.params.movieId;

  let { title, genres, score } = req.body;

  console.log(title)
  console.log(score)
  console.log(genres)

  //Customization of incoming data to db model
  if (typeof title !== 'string') title = title.toString() //TOFIX crear función que reciba tipos de variable y los convierta.
  // if (typeof genres === 'string') genres = Array.from(genres.split(','));
  if (typeof score !== 'number') score = Number(score)

  console.log(title)
  console.log(score)
  console.log(genres)

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
        genres: {
          connect: {
            id: genres
          },
        }
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