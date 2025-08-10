import { Module } from '@nestjs/common';
import { MoviesController } from '../controllers/movies.controller';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [MoviesController],
})
export class MoviesModule {}
