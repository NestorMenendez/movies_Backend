import MoviesModel from "../model/movies.model"


export const genresDelete = async (incomingGenreId: string) => {

    const genreId = incomingGenreId;
    if (!genreId){
        //TOFIX: No es necesario dar alerta de que nadie tiene la pelicula?
    }

    const moviesWithGenre = await MoviesModel.updateMany ({genre: genreId},{$pull:{genre: genreId}})

}