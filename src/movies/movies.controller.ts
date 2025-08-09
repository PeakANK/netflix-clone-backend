import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopular(@Query('page') page?: string) {
    return this.moviesService.fetchPopularMovies(Number(page ?? 1));
  }

  @Get('top-rated')
  getTopRated(@Query('page') page?: string) {
    return this.moviesService.fetchTopRatedMovies(Number(page ?? 1));
  }

  @Get('upcoming')
  getUpcoming(@Query('page') page?: string) {
    return this.moviesService.fetchUpcomingMovies(Number(page ?? 1));
  }

  @Get('now-playing')
  getNowPlaying(@Query('page') page?: string) {
    return this.moviesService.fetchNowPlayingMovies(Number(page ?? 1));
  }

  @Get('trending/:window')
  getTrending(@Param('window') window: 'day' | 'week', @Query('page') page?: string) {
    return this.moviesService.fetchTrendingMovies(window ?? 'day', Number(page ?? 1));
  }

  @Get('search')
  search(@Query('q') q: string, @Query('page') page?: string) {
    return this.moviesService.searchMovies(q, Number(page ?? 1));
  }

  @Get(':id')
  getDetails(@Param('id') id: string, @Query('append') append?: string) {
    // e.g. /movies/550?append=videos,images,credits
    const arr = append ? append.split(',').map(s => s.trim()).filter(Boolean) : undefined;
    return this.moviesService.getMovieDetails(Number(id), arr);
  }

  @Get(':id/credits')
  getCredits(@Param('id') id: string) {
    return this.moviesService.getMovieCredits(Number(id));
  }

  @Get(':id/videos')
  getVideos(@Param('id') id: string) {
    return this.moviesService.getMovieVideos(Number(id));
  }

  @Get('genres/list')
  getGenres() {
    return this.moviesService.getGenres();
  }

  @Get('discover/list')
  discover(
    @Query('page') page?: string,
    @Query('with_genres') with_genres?: string,
    @Query('sort_by') sort_by?: string,
    @Query('year') year?: string,
    @Query('lang') with_original_language?: string,
  ) {
    return this.moviesService.discoverMovies({
      page: page ? Number(page) : undefined,
      with_genres,
      sort_by,
      year: year ? Number(year) : undefined,
      with_original_language,
    });
  }
}
