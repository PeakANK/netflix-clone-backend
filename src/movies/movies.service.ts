// src/movies/movies.service.ts
import { Injectable, BadGatewayException, InternalServerErrorException,Logger,} from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

type TimeWindow = 'day' | 'week';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private readonly tmdbAccessToken: string;
  private readonly tmdbBaseUrl: string;
  private readonly http: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    const token = this.config.get<string>('TMDB_API_ACCESS_TOKEN');
    if (!token) throw new Error('TMDB_API_ACCESS_TOKEN is not defined in your environment');
    this.tmdbAccessToken = token;

    const url = this.config.get<string>('TMDB_API_BASE_URL');
    if (!url) throw new Error('TMDB_API_BASE_URL is not defined in your environment');
    this.tmdbBaseUrl = url;

    this.http = axios.create({
      baseURL: this.tmdbBaseUrl,
      headers: {
        Authorization: `Bearer ${this.tmdbAccessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      // timeout: 8000, // optional
    });
  }

  private ensureValidPage(page?: number) {
    const p = Number(page ?? 1);
    if (Number.isNaN(p) || p < 1 || p > 500) {
      throw new BadGatewayException(`Invalid page value: ${page}. Page must be an integer between 1 and 500.`);
    }
    return p;
  }

  private handleAxiosError(err: unknown, contextMsg: string): never {
    this.logger.error(contextMsg, err instanceof Error ? err.stack : String(err));

    if (axios.isAxiosError(err) && err.response) {
      const { status, statusText, data } = err.response;
      // Optional: surface TMDB's status_message if present
      const detail = (data && (data.status_message || data.message)) ? ` - ${data.status_message || data.message}` : '';
      if (status === 400) {
        throw new BadGatewayException(`TMDB API error: ${status} ${statusText}${detail}`);
      }
      if (status >= 500) {
        throw new InternalServerErrorException(`TMDB API error: ${status} ${statusText}${detail}`);
      }
      throw new InternalServerErrorException(`TMDB API error: ${status} ${statusText}${detail}`);
    }

    throw new InternalServerErrorException('Unexpected error calling TMDB');
  }

  private async request<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      const { data } = await this.http.get<T>(path, {
        params: { language: 'en-US', include_adult: false, include_video: false, ...params },
      });
      return data;
    } catch (err) {
      return this.handleAxiosError(err, `Error calling ${path}`);
    }
  }

  // --- Existing
  async fetchPopularMovies(page = 1): Promise<any> {
    page = this.ensureValidPage(page);
    this.logger.debug(`Fetching popular movies (page ${page})`);
    return this.request('/movie/popular', { page });
  }

  // --- New additions

  async fetchTopRatedMovies(page = 1): Promise<any> {
    page = this.ensureValidPage(page);
    this.logger.debug(`Fetching top rated movies (page ${page})`);
    return this.request('/movie/top_rated', { page });
  }

  async fetchUpcomingMovies(page = 1): Promise<any> {
    page = this.ensureValidPage(page);
    this.logger.debug(`Fetching upcoming movies (page ${page})`);
    return this.request('/movie/upcoming', { page, region: 'US' });
  }

  async fetchNowPlayingMovies(page = 1): Promise<any> {
    page = this.ensureValidPage(page);
    this.logger.debug(`Fetching now playing movies (page ${page})`);
    return this.request('/movie/now_playing', { page, region: 'US' });
  }

  async fetchTrendingMovies(timeWindow: TimeWindow = 'day', page = 1): Promise<any> {
    page = this.ensureValidPage(page);
    this.logger.debug(`Fetching trending movies (${timeWindow}, page ${page})`);
    return this.request(`/trending/movie/${timeWindow}`, { page });
  }

  async searchMovies(query: string, page = 1): Promise<any> {
    if (!query || !query.trim()) {
      throw new BadGatewayException('Query is required');
    }
    page = this.ensureValidPage(page);
    this.logger.debug(`Searching movies: "${query}" (page ${page})`);
    return this.request('/search/movie', { query, page });
  }

  async getMovieDetails(movieId: number, append?: string[]): Promise<any> {
    if (!movieId || Number.isNaN(Number(movieId))) {
      throw new BadGatewayException('movieId must be a valid number');
    }
    const params = append && append.length ? { append_to_response: append.join(',') } : undefined;
    this.logger.debug(`Fetching movie details for id=${movieId}`);
    return this.request(`/movie/${movieId}`, params);
  }

  async getMovieCredits(movieId: number): Promise<any> {
    if (!movieId || Number.isNaN(Number(movieId))) {
      throw new BadGatewayException('movieId must be a valid number');
    }
    this.logger.debug(`Fetching credits for id=${movieId}`);
    return this.request(`/movie/${movieId}/credits`);
  }

  async getMovieVideos(movieId: number): Promise<any> {
    if (!movieId || Number.isNaN(Number(movieId))) {
      throw new BadGatewayException('movieId must be a valid number');
    }
    this.logger.debug(`Fetching videos for id=${movieId}`);
    return this.request(`/movie/${movieId}/videos`);
  }

  async getGenres(): Promise<any> {
    this.logger.debug('Fetching genres');
    return this.request('/genre/movie/list');
  }

  // Discover is powerful for filtering
  async discoverMovies(options: {
    page?: number;
    with_genres?: string;
    sort_by?: string;
    year?: number;
    with_original_language?: string; 
  } = {}): Promise<any> {
    const page = this.ensureValidPage(options.page ?? 1);
    const { with_genres, sort_by, year, with_original_language } = options;

    this.logger.debug(`Discover movies (page ${page}, genres=${with_genres ?? '-'}, sort=${sort_by ?? '-'})`);

    return this.request('/discover/movie', {
      page,
      with_genres,
      sort_by,
      primary_release_year: year,
      with_original_language,
    });
  }
}
