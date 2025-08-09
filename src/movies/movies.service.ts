import { Injectable, BadGatewayException, InternalServerErrorException, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

type TimeWindow = 'day' | 'week';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    const token = this.config.get<string>('TMDB_API_ACCESS_TOKEN');
    const baseURL = this.config.get<string>('TMDB_API_BASE_URL');
    if (!token) throw new Error('TMDB_API_ACCESS_TOKEN missing');
    if (!baseURL) throw new Error('TMDB_API_BASE_URL missing');

    this.http = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  }

  private ensureValidPage(page?: number) {
    const p = Number(page ?? 1);
    if (Number.isNaN(p) || p < 1 || p > 500) {
      throw new BadGatewayException(`Invalid page: ${page}. 1..500`);
    }
    return p;
  }

  private fail(err: any, ctx: string): never {
    this.logger.error(ctx, err?.stack || String(err));
    if (axios.isAxiosError(err) && err.response) {
      const { status, statusText, data } = err.response;
      const detail = data?.status_message ? ` - ${data.status_message}` : '';
      const msg = `TMDB ${status} ${statusText}${detail}`;
      if (status >= 500) throw new InternalServerErrorException(msg);
      throw new BadGatewayException(msg);
    }
    throw new InternalServerErrorException('TMDB request failed');
  }

  private async request<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      const { data } = await this.http.get<T>(path, { params: { language: 'en-US', include_adult: false, include_video: false, ...params } });
      return data;
    } catch (e) { return this.fail(e, `GET ${path}`); }
  }

  // Movies
  fetchPopularMovies(page=1){ return this.request('/movie/popular',   { page: this.ensureValidPage(page) }); }
  fetchTopRatedMovies(page=1){ return this.request('/movie/top_rated',{ page: this.ensureValidPage(page) }); }
  fetchUpcomingMovies(page=1){ return this.request('/movie/upcoming', { page: this.ensureValidPage(page), region: 'US' }); }
  fetchNowPlayingMovies(page=1){return this.request('/movie/now_playing',{ page: this.ensureValidPage(page), region: 'US' }); }
  fetchTrendingMovies(win:TimeWindow='day', page=1){ return this.request(`/trending/movie/${win}`, { page: this.ensureValidPage(page) }); }

  // TV
  fetchPopularTV(page=1){     return this.request('/tv/popular',    { page: this.ensureValidPage(page) }); }
  fetchTopRatedTV(page=1){    return this.request('/tv/top_rated',  { page: this.ensureValidPage(page) }); }
  fetchOnTheAirTV(page=1){    return this.request('/tv/on_the_air', { page: this.ensureValidPage(page) }); }

  // Details
  getMovieDetails(id:number){ if(!id) throw new BadGatewayException('movie id'); return this.request(`/movie/${id}`, {}); }
  getTVDetails(id:number){    if(!id) throw new BadGatewayException('tv id');    return this.request(`/tv/${id}`, {}); }

  // Genres
  getGenres(){ return this.request('/genre/movie/list'); }

  // New & Popular
  async fetchNewAndPopular(page=1){
    const [movies, tv] = await Promise.all([
      this.request('/movie/upcoming', { page: this.ensureValidPage(page) }),
      this.request('/tv/on_the_air',  { page: this.ensureValidPage(page) }),
    ]);
    return { movies: (movies as any).results ?? [], tv: (tv as any).results ?? [] };
  }
}
