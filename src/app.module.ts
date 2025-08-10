import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import tmdbConfig from './config/tmdb.config';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './modules/movies.module';
import { TvModule } from './modules/tv.module';
import { SearchModule } from './modules/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [tmdbConfig] }),
    TmdbModule,
    MoviesModule,
    TvModule,
    SearchModule,
  ],
})
export class AppModule {}
