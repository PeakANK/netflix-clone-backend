import { Module } from '@nestjs/common';
import { TvController } from '../controllers/tv.controller';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [TvController],
})
export class TvModule {}
