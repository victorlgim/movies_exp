import { z } from 'zod'

const movieSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(255).nullable().optional(),
    duration: z.number().positive(),
    price: z.number().int().min(1),
  });

const returnMovieSchema = movieSchema.extend({
    id: z.number()
})

const editMovieSchema = movieSchema.partial()

const returnAllMoviesSchema = z.object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    count: z.number(),
    data: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable().optional(),
        duration: z.number(),
        price: z.number()
      })
    )
  }).array(); 

export {
    movieSchema,
    returnMovieSchema,
    editMovieSchema,
    returnAllMoviesSchema
}