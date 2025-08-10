import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { successResponse, errorResponse } from '../utils/response.util';

type TvCategory = 'popular' | 'top_rated' | 'airing_today' | 'on_the_air';

@Controller('api/tv')
export class TvController {
  constructor(private readonly tmdb: TmdbService) {}

  @Get(':category')
  async list(
    @Param('category') category: TvCategory,
    @Query('page') page: number = 1,
    @Query('language') language?: string,
  ) {
    const allowed: TvCategory[] = ['popular', 'top_rated', 'airing_today', 'on_the_air'];
    if (!allowed.includes(category)) {
      return errorResponse(
        `Invalid category. Allowed: ${allowed.join(', ')}`,
        400
      );
    }

    const data = await this.tmdb.get(`/tv/${category}`, { page, language });
    console.log(data);
    return successResponse(data, 'TV shows fetched successfully', 200);
  }

  @Get('details/:id')
  async details(
    @Param('id') id: string,
    @Query('language') language?: string,
  ) {
    const data = await this.tmdb.get(`/tv/${id}`, {
      language,
      append_to_response: 'videos,images,credits',
    });
    return successResponse(data, 'TV show details fetched successfully', 200);
  }
}
