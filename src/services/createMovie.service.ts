import { IMovieReturn } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { returnMovieSchema } from "../schemas/movies.schemas";
import { AppDataSource } from "../data-source";

const createMovieService = async (movieData: Movie): Promise<IMovieReturn> => {

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};

export default createMovieService;
