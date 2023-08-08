import { Request, Response } from 'express';
import prisma from '../db/clientPrisma';


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required input' })
    }
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).send(newUser);

  } catch (error) {
    return res.status(500).json(error);
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving users' });
  }
};


export const getOneUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId
      },
      include: {
        moviesFav: true
      }
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving user' });
  }
};


export const updateUser = async (req: Request, res: Response) => {

  const userId = req.params.userId;
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required input' });
    }

    const userToUpdate = await prisma.users.update({
      where: {
        id: userId
      },
      data: {
        name,
        email,
        password
      }
    })
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(userToUpdate);

  } catch (error) {
    return res.status(500).json({ error: 'Error updating users' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const userToDelete = await prisma.users.delete({
      where: {
        id: userId
      }
    });
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: `User Id: ${userId} deleted` });

  } catch (error) {
    return res.status(500).json({ error: 'Error deleting user' });
  }
};

// export const toggleFavoritesMovies = async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const movieId = req.params.movieId;

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const movie = await prisma.movies.findUnique({
//       where: {
//         id: movieId,
//       },
//     });

//     if (!movie) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }

//     const updatedMoviesFav = prisma.

//     const userToUpdate = await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         moviesFav: {
//           [user.includes(movieId) ? 'disconnect' : 'connect']: {
//             id: movieId,
//           },
//         },
//       },
//     });

//     return res.status(200).json(userToUpdate);

//   } catch {
//     return res.status(500).json({ error: 'Error updating users' });

//   }
// }