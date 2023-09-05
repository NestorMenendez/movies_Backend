import { Request, Response } from 'express';
import { prismaClient } from '../db/clientPrisma';
import { dbTypeConverter } from '../utils/dbTypeConverter';


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, moviesFav } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: 'Missing required input' })
    }
    const userName = email.split('@')[0];
    const newUser = await prismaClient.users.create({
      data: {
        email,
        name: userName,
        password: ""
      }
    })

    return res.status(201).send(newUser);

  } catch (error) {
    return res.status(500).json(error);
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.users.findMany();

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving users' });
  }
};


export const getOneUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await prismaClient.users.findUnique({
      where: {
        id: dbTypeConverter(userId)
      },
      include: {
        moviesFav: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving user' });
  }
};


export const getOneUserByMailParams = async (req: Request, res: Response) => {

  const userEmail = req.params.userEmail;

  try {
    const user = await prismaClient.users.findUnique({
      where: {
        email: userEmail
      }
    }
    );
    if (user) {
      return res.status(200).json(user);
    }

    return res.status(200).json({ email: 'notFound' });

  } catch (error) {
    throw new Error('Error retrieving user');
  }
};


export const getOneUserByMail = async (userEmail: string) => {

  try {
    const user = await prismaClient.users.findUnique({
      where: {
        email: userEmail
      }
    }
    );

    return user?.id;

  } catch (error) {
    throw new Error('Error retrieving user');
  }
};


export const updateUser = async (req: Request, res: Response) => {

  const userId = req.params.userId;
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required input' });
    }

    const userToUpdate = await prismaClient.users.update({
      where: {
        id: dbTypeConverter(userId)
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
    const userToDelete = await prismaClient.users.delete({
      where: {
        id: dbTypeConverter(userId)
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