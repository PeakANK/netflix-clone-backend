import { registerAs } from '@nestjs/config';

export default registerAs('tmdb', () => ({
  baseUrl: process.env.TMDB_API_BASE_URL ?? 'https://api.themoviedb.org/3',
  bearer: process.env.TMDB_API_ACCESS_TOKEN ?? '',
  language: process.env.DEFAULT_LANGUAGE ?? 'en-US',
  region: process.env.DEFAULT_REGION ?? 'US',
}));
