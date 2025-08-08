import { Injectable, BadGatewayException, InternalServerErrorException, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private readonly tmdbAccessToken: string;
  private readonly tmbdBaseUrl: string;

  constructor(private readonly config: ConfigService) {
    const token = this.config.get<string>('TMDB_API_ACCESS_TOKEN');
    if (!token) {
      throw new Error('TMDB_API_ACCESS_TOKEN is not defined in your environment');
    }
    this.tmdbAccessToken = token;

    const url = this.config.get<string>('TMDB_API_BASE_URL');
    if (!url) {
      throw new Error('TMDB_API_BASE_URL is not defined in your environment');
    }
    this.tmbdBaseUrl = url;
  }

  async fetchPopularMovies(page = 1): Promise<any> {

    if (isNaN(page) || page < 1 || page > 500) {
      throw new BadGatewayException(`Invalid page value: ${page}. Page must be an integer between 1 and 500.`);
    }
    
    const url = `${this.tmbdBaseUrl}/movie/popular`;
    const headers = {
      Authorization: `Bearer ${this.tmdbAccessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };
    const params = {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: page,
    };

    try {
      const { data } = await axios.get(url, { headers, params });
      this.logger.debug(`Fetched popular movies (page ${page})`);
      return data;
    } catch (err) {
      this.logger.error('Error fetching popular movies', err instanceof Error ? err.stack : err);

      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.status);
        if (err.response.status === 400) {
          throw new BadGatewayException(`TMDB API error: ${err.response.status} ${err.response.statusText}`);
        }

        if (err.response.status === 500) {
          throw new InternalServerErrorException(`TMDB API error: ${err.response.status} ${err.response.statusText}`);
        }

        throw new InternalServerErrorException(`TMDB API error: ${err.response.status} ${err.response.statusText}`);
      }

      throw new InternalServerErrorException('Unexpected error fetching popular movies');
    }
  }
}
