import { Request, Response } from 'express';
import prisma from '../db/clientPrisma';


export const createGenre = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    if (!name) {
      return res.status(400).json({ error: 'Missing required input' })
    }
    const newGenre = await prisma.genres.create({
      data: {
        name
      }
    })

    return res.status(201).send(newGenre);

  } catch (error) {
    return res.status(500).json({ error: 'Impossible to connect to server' });
  }
};


export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genres.findMany();

    return res.status(200).json(genres);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving genres' });
  }
};


export const getOneGenre = async (req: Request, res: Response) => {
  const genreId = req.params.genreId;
  try {
    const genre = await prisma.genres.findUnique({
      where: {
        id: genreId
      }
    });

    return res.status(200).json(genre);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving genre' });
  }
};


export const updateGenre = async (req: Request, res: Response) => {

  const { genreId } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: 'Missing required input' });
    }

    const genreToUpdate = await prisma.genres.update({
      where: {
        id: genreId
      },
      data: {
        name: name
      }
    })
    if (!genreToUpdate) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    return res.status(200).json(genreToUpdate);

  } catch (error) {
    return res.status(500).json({ error: 'Error updating genre' });
  }
};


export const deleteGenre = async (req: Request, res: Response) => {
  const genreId = req.params.genreId;

  try {

    const genreToDelete = await prisma.genres.delete({
      where: {
        id: genreId
      }
    });
    if (!genreToDelete) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    return res.status(200).json({ message: `User Id: ${genreId} deleted` });

  } catch (error) {
    return res.status(500).json({ error: 'Error deleting genre' });
  }
};