import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movies: MoviesService) {}

  @Get('popular')
  async getPopular() {
    return this.movies.fetchPopularMovies();
  }
}
