import { Request, Response } from "express";
import { Movie } from "../entities/movie.entity";
import createMovieService from "../services/createMovie.service";
import { listMoviesService } from "../services/listMovies.service";
import { IMoviesReturn } from "../interfaces/movies.interfaces";

const createMovieController = async (req: Request, res: Response) => {
  const movieData: Movie = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json({
    id: newMovie.id,
    name: newMovie.name,
    description: newMovie.description,
    duration: newMovie.duration,
    price: newMovie.price
  });
};

const listMoviesController = async (req: Request, res: Response) => {

    const { page, perPage } = req.query
    const protocol = req.protocol
    const host = 'localhost:3000'

    const movie: IMoviesReturn = await listMoviesService(Number(page), Number(perPage), protocol, host);

    return res.json(movie)

}

export { 
    createMovieController,
    listMoviesController
 };
