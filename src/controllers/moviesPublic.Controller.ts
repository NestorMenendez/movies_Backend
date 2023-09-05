import { Request, Response } from 'express';
import prisma from '../db/clientPrisma';
import { uploadImage } from '../utils/cloudinary'
import fs from 'fs-extra';
import { getOneUserByMail } from './user.Controller';


export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await prisma.movies.findMany({
      select: {
        id: true,
        title: true,
        score: true,
        genres: {
          select: {
            id: true,
            name: true,
          }
        },
        createdAt: false,
        updatedAt: false,
        image: true
      }
    });

    return res.status(200).json(movies);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving movies' });
  }
};