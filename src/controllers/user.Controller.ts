import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import { Types } from 'mongoose';


export const createUser = async (req: Request, res: Response) => {
  const {name, email, moviesFav ,password} = req.body;
    try{
      if(!name || !email || !moviesFav || !password){
        return res.status(400).json({error:'Missing required input'})
      }
      const newUser = await UserModel.create({
        name,
        email,
        moviesFav,
        password
      })

    return res.status(201).send(newUser);
    
    }catch (error) {
      return res.status(500).json(error);
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try{
    const users = await UserModel.find();

  return res.status(200).json(users);

  }catch (error) {
    return res.status(500).json({ error: 'Error retrieving users' });
  }
};


export const getOneUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try{
    const user = await UserModel.findById(userId).populate({
      path:'moviesFav',
        populate:{
          path: 'genre',
          select: '_id name'
        }
    }); //TOFIX solo devuelve los id's, puede ser por tener enlazada dentro otra petición???

  return res.status(200).json(user);

  }catch (error) {
    return res.status(500).json({ error: 'Error retrieving user' });
  }
};


export const updateUser = async (req: Request, res: Response) => {

  const userId = req.params.userId;
  const {name, email, moviesFav, password} = req.body;

  try{
    if (!name || !email || !moviesFav || !password){
      return res.status(400).json({ error: 'Missing required input' });
    }

    const userToUpdate = await UserModel.findByIdAndUpdate(userId, {name, email, moviesFav, password}, {new: true})
    if (!userToUpdate){
      return res.status(404).json({error: 'User not found'});
    }

  return res.status(200).json(userToUpdate);

  }catch (error) {
    return res.status(500).json({ error: 'Error updating users' });
  }
};


export const toggleFavoritesMovies = async (req: Request, res: Response) => {

  const userId = req.params.userId;
  const movieId = req.params.movieId;

  // const userObjectId = new Types.ObjectId(userId);
  const movieObjectId = new Types.ObjectId(movieId);

  try{

    const user = await UserModel.findById (userId);
    console.log (user);
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    const movieInFavorites = user.moviesFav.includes(movieObjectId);

    const userToUpdate = await UserModel.findByIdAndUpdate(userId,
      movieInFavorites ? {$pull: {moviesFav: movieId}} : {$addToSet: {moviesFav: movieId}} ,
      {new: true}
    )
  
  return res.status(200).json(userToUpdate);
  
  }catch{
    return res.status(500).json({ error: 'Error updating users' });

  }
}


export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try{
    const userToDelete = await UserModel.findByIdAndDelete(userId);
    if (!userToDelete){
      return res.status(404).json({error: 'User not found'});
    }

  return res.status(200).json({message: `User Id: ${userId} deleted`});

  }catch (error) {
    return res.status(500).json({error: 'Error deleting user'});
  }
};