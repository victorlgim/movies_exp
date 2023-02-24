import { Repository } from "typeorm"
import { IMovieReturn, IMoviesReturn } from "../interfaces/movies.interfaces"
import { returnAllMoviesSchema } from "../schemas/movies.schemas"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities/movie.entity"


const listMoviesService = async (page: number, perPage: number, protocol: string, host: string): Promise<IMoviesReturn> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  
    const [movies, count] = await movieRepository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage,
      order: {
        name: 'ASC'
      }
    })
  
    const totalPages = Math.ceil(count / perPage)
    const prevPage = page > 1 ? `${protocol}://${host}/movies?page=${page - 1}&perPage=${perPage}` : null
    const nextPage = page < totalPages ? `${protocol}://${host}/movies?page=${page + 1}&perPage=${perPage}` : null
  
    const movie: IMoviesReturn = {
      prevPage,
      nextPage,
      count,
      data: movies.map(movie => ({
        id: movie.id,
        name: movie.name,
        description: movie.description ?? null,
        duration: movie.duration,
        price: movie.price
      }))
    }
    console.log(movie)
    return movie
  }
  
  export { listMoviesService }