import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'
import { Movie } from './entities/movie.entity'
import { createMovies1677262829241 } from './migrations/1677262829241-createMovies'

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './src/entities/**.{ts,js}')
    const migrationsPath: string = path.join(__dirname, './src/migrations/**.{ts,js}')

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if(!dbUrl){
        throw new Error('Env var DATABASE_URL does not exists')
    }

    const nodeEnv: string | undefined = process.env.NODE_ENV

    if(nodeEnv === 'test'){
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [Movie]
        }
    }
    
    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        migrations: [createMovies1677262829241],
        entities: [Movie]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export {
    AppDataSource
}