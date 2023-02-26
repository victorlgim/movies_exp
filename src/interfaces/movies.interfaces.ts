import { editMovieSchema, movieSchema, returnAllMoviesSchema, returnMovieSchema } from '../schemas/movies.schemas'
import { z } from 'zod'
import { DeepPartial, Repository } from 'typeorm'
import { Movie } from '../entities/movie.entity'

type IMovie = z.infer<typeof movieSchema>
type IMovieEdit = z.infer<typeof editMovieSchema>
type IMovieReturn = z.infer<typeof returnMovieSchema>
type iMovieRepo = Repository<Movie>;
type iMoviesRepo = Repository<IMovieReturn>

interface IMoviesReturn {
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data: Movie[];
}

interface IOrderBy {
    [key: string]: 'ASC' | 'DESC';
}

export {
    IMovie,
    IMovieReturn,
    iMovieRepo,
    IMoviesReturn,
    IMovieEdit,
    IOrderBy,
    iMoviesRepo
}