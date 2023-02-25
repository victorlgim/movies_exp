import { Repository, DeepPartial } from "typeorm"
import { IMovieReturn, IMovieEdit } from "../interfaces/movies.interfaces"
import { Movie } from "../entities/movie.entity"
import { returnMovieSchema } from "../schemas/movies.schemas"
import { AppDataSource } from "../data-source"


const updateMovieService = async (newMovieData: DeepPartial<Movie>, idMovie: number): Promise<IMovieReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })

    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    })

    await movieRepository.save(movie)

    const updatedMovie = returnMovieSchema.parse(movie)

    return updatedMovie

}

export default updateMovieService