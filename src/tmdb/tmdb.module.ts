import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TmdbService } from './tmdb.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        baseURL: cfg.get<string>('tmdb.baseUrl'),
        headers: {
          Authorization: `Bearer ${cfg.get<string>('tmdb.bearer')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        timeout: 8000,
      }),
    }),
  ],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class TmdbModule {}
