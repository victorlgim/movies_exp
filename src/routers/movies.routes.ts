import { Router } from "express";
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieExistsMiddleware, checkDuplicateMovieName } from "../middlewares/ensureMovieExists.middleware";
import { editMovieSchema, movieSchema } from "../schemas/movies.schemas";

const moviesRoutes: Router = Router();

moviesRoutes.post("", ensureDataIsValidMiddleware(movieSchema), checkDuplicateMovieName, createMovieController);
moviesRoutes.get("", listMoviesController)
moviesRoutes.patch("/:id", ensureMovieExistsMiddleware, ensureDataIsValidMiddleware(editMovieSchema), checkDuplicateMovieName, updateMovieController)
moviesRoutes.delete("/:id", ensureMovieExistsMiddleware, deleteMovieController)

export default moviesRoutes;
