// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly accessToken: string;

  constructor(private readonly config: ConfigService) {
    const token = this.config.get<string>('TMDB_API_ACCESS_TOKEN');
    if (!token) {
      throw new Error('TMDB_API_ACCESS_TOKEN is not defined in your environment');
    }
    this.accessToken = token;
  }

  async fetchPopularMovies() {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    };
    const params = {
      language: 'en-US',
      page: 1,
    };

    const { data } = await axios.get(url, { headers, params });
    console.log(data);
    return data;
  }
}
