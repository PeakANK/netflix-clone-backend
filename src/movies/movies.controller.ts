import { Controller, Get, Query, HttpStatus,NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  async getPopular(@Query('page') page?: string,): Promise<any> {
    try{
      const pageNum = page ? parseInt(page, 10) : 1;
      const movies = await this.moviesService.fetchPopularMovies(pageNum);
      if (!movies) {
        throw new NotFoundException('Movies not found');
      }
      return {
        statusCode: HttpStatus.OK,
        data: movies,
      };
    }
    catch (error){
      throw new InternalServerErrorException(error.message);
    }
  }
}
