import { Controller, Get, Query } from '@nestjs/common';
import { TmdbService } from '../tmdb/tmdb.service';
import { successResponse, errorResponse } from '../utils/response.util';

@Controller('api/search')
export class SearchController {
  constructor(private readonly tmdb: TmdbService) {}

  @Get()
  async multi(
    @Query('q') q: string,
    @Query('page') page: number = 1,
    @Query('language') language?: string,
  ) {
    if (!q || !q.trim()) {
      return errorResponse('Query "q" is required', 400);
    }
    const data = await this.tmdb.get(`/search/multi`, {
      query: q,
      page,
      language,
      include_adult: false,
    });
    return successResponse(data, 'Search results fetched successfully', 200);
  }
}
