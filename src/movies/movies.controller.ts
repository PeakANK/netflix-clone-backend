import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly svc: MoviesService) {}

  // Movies
  @Get('movies/popular')    getPopularMovies(@Query('page') page?: string)    { return this.svc.fetchPopularMovies(Number(page)); }
  @Get('movies/top-rated')  getTopRatedMovies(@Query('page') page?: string)   { return this.svc.fetchTopRatedMovies(Number(page)); }
  @Get('movies/upcoming')   getUpcomingMovies(@Query('page') page?: string)   { return this.svc.fetchUpcomingMovies(Number(page)); }
  @Get('movies/now-playing')getNowPlayingMovies(@Query('page') page?: string) { return this.svc.fetchNowPlayingMovies(Number(page)); }

  // TV
  @Get('tv/popular')        getPopularTV(@Query('page') page?: string)        { return this.svc.fetchPopularTV(Number(page)); }
  @Get('tv/top-rated')      getTopRatedTV(@Query('page') page?: string)       { return this.svc.fetchTopRatedTV(Number(page)); }
  @Get('tv/on-the-air')     getOnTheAirTV(@Query('page') page?: string)       { return this.svc.fetchOnTheAirTV(Number(page)); }

  // Details
  @Get('movies/:id')        getMovieDetails(@Param('id') id: string)          { return this.svc.getMovieDetails(Number(id)); }
  @Get('tv/:id')            getTVDetails(@Param('id') id: string)             { return this.svc.getTVDetails(Number(id)); }

  // Genres (movie)
  @Get('movies/genres/list') getGenres()                                      { return this.svc.getGenres(); }

  // New & Popular (combined)
  @Get('new-and-popular')   getNewAndPopular(@Query('page') page?: string)    { return this.svc.fetchNewAndPopular(Number(page)); }
}
