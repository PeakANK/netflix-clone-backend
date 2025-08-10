import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { successResponse, errorResponse } from '../utils/response.util';

type MovieCategory = 'popular' | 'top_rated' | 'now_playing' | 'upcoming';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly tmdb: TmdbService) {}

  @Get(':category')
  async list(
    @Param('category') category: MovieCategory,
    @Query('page') page: number = 1,
    @Query('language') language?: string,
    @Query('region') region?: string,
  ) {
    const allowed: MovieCategory[] = ['popular', 'top_rated', 'now_playing', 'upcoming'];
    if (!allowed.includes(category)) {
      return errorResponse(
        `Invalid category. Allowed: ${allowed.join(', ')}`,
        400
      );
    }

    const data = await this.tmdb.get(`/movie/${category}`, { page, language, region });
    return successResponse(data, 'Movies fetched successfully', 200);
  }

  @Get('details/:id')
  async details(
    @Param('id') id: string,
    @Query('language') language?: string,
  ) {
    const data = await this.tmdb.get(`/movie/${id}`, {
      language,
      append_to_response: 'videos,images,credits',
    });
    return successResponse(data, 'Movie details fetched successfully', 200);
  }
}
