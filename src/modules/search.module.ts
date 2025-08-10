import { Module } from '@nestjs/common';
import { SearchController } from '../controllers/search.controller';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [TmdbModule],
  controllers: [SearchController],
})
export class SearchModule {}
