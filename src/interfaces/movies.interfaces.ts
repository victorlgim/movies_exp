import { movieSchema, returnAllMoviesSchema, returnMovieSchema } from '../schemas/movies.schemas'
import { z } from 'zod'
import { DeepPartial, Repository } from 'typeorm'
import { Movie } from '../entities/movie.entity'



type IMovie = z.infer<typeof movieSchema>
type IMovieReturn = z.infer<typeof returnMovieSchema>
type IMoviesReturn = z.infer<typeof returnAllMoviesSchema>
type iMovieRepo = Repository<Movie>;

export {
    IMovie,
    IMovieReturn,
    iMovieRepo,
    IMoviesReturn 
}