import { Repository } from "typeorm";
import { IMoviesReturn } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entity";

const listMoviesService = async (payload: any) => {
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
    const count: number = await movieRepository.count()
  
    const page: number = +payload.page > 0 ? +payload.page : 1
  
    const perPage: number = Number(payload.perPage) > 0 && Number(payload.perPage) <= 5 ?
    Number(payload.perPage) : 5

    const sort: keyof Movie = (payload.sort !== 'duration' &&
    payload.sort !== 'price' ? 'id' : payload.sort) || 'id'
  
    let order: any = (payload.order === 'asc' || payload.order === 'desc') ? payload.order : 'ASC';
  
    let prevPage: string | null = 
    page === 1 ? null : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
  
    let nextPage: string | null = 
    count <= perPage * page ? null : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
  
    let findMovies: any
    let orderKey: 'duration' | 'price' | 'id'
    
    if (sort === 'duration') {
      orderKey = 'duration'
    } else if (sort === 'price') {
      orderKey = 'price'
    } else {
      orderKey = 'id'
      order = undefined 
    }
    
    findMovies = await movieRepository.find({
      take: perPage,
      skip: perPage * (page - 1),       
      order: { 
        [orderKey]: order 
      }
    })
  
    const movie: IMoviesReturn = {
      prevPage: prevPage,
      nextPage: nextPage,
      count: count,
      data: findMovies
    }
  
    return movie
  }
  
  export default listMoviesService

