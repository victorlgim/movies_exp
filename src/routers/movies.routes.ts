import { Router } from "express";
import { createMovieController, listMoviesController } from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieExistsMiddleware, checkDuplicateMovieName } from "../middlewares/ensureMovieExists.middleware";
import { movieSchema } from "../schemas/movies.schemas";

const moviesRoutes: Router = Router();

moviesRoutes.post("", ensureDataIsValidMiddleware(movieSchema), checkDuplicateMovieName, createMovieController);
moviesRoutes.get("", listMoviesController)


export default moviesRoutes;
