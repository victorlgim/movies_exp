import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";
import { AppError } from "../errors";

export const ensureMovieExistsMiddleware = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export const checkDuplicateMovieName = async ( req: Request, res: Response, next: NextFunction) => {

  const movieName: string = req.body.name;
  const movieRepository = AppDataSource.getRepository(Movie);
  const existingMovie = await movieRepository.findOne({
    where: {
      name: movieName,
    },
  });

  if (movieName) {
    if (existingMovie) {
        throw new AppError(`Movie already exists.`, 409);
      }
  }
  

  next();
};
