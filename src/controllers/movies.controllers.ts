import { Request, Response } from "express";
import { Movie } from "../entities/movie.entity";
import createMovieService from "../services/createMovie.service";
import { listMoviesService } from "../services/listMovies.service";
import { IMoviesReturn } from "../interfaces/movies.interfaces";
import updateMovieService from "../services/updateMovie.service";
import { DeepPartial } from "typeorm";
import deleteMovieService from "../services/deleteMovie.service";

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

    const pageNum = page ? parseInt(page as string) : 1;
    const perPageNum = perPage ? parseInt(perPage as string) : 10;

    const movie: IMoviesReturn = await listMoviesService(pageNum, perPageNum, protocol, host);

    return res.json(movie)

}

const updateMovieController = async (req: Request, res: Response) => {

    const movieData: DeepPartial<Movie> = req.body
    const idMovie = parseInt(req.params.id)

    const updatedMovie = await updateMovieService(movieData, idMovie)

    return res.json({
        id: updatedMovie.id,
        name: updatedMovie.name,
        description: updatedMovie.description,
        duration: updatedMovie.duration,
        price: updatedMovie.price
    })
}

const deleteMovieController = async (req: Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id))

    return res.status(204).send()
}

export { 
    createMovieController,
    listMoviesController,
    updateMovieController,
    deleteMovieController
 };
