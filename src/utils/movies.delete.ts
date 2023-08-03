import UserModel from "../model/user.model"


export const moviesDelete = async (incomingMovieId: string) => {

    const movieId = incomingMovieId;
    if (!movieId){
        //TOFIX: No es necesario dar alerta de que nadie tiene la pelicula?
    }

    const usersWithMovie = await UserModel.updateMany ({movies: movieId},{$pull:{movies: movieId}})

}