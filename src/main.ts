import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './guards/api-key.guard';
import { TmdbExceptionFilter } from './tmdb/tmdb.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // CORS — allow your Next.js origin and the x-api-key header
  const origin = process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN;
  app.enableCors({
    origin,                               // e.g. http://localhost:3000
    credentials: true,
    methods: ['GET', 'OPTIONS'],          // what you actually use
    allowedHeaders: ['x-api-key', 'content-type'],
    exposedHeaders: [],                   // optional
    maxAge: 86400,                        // cache preflight 1 day
  });

  app.use(helmet({ hidePoweredBy: true }));
  app.use(json({ limit: '200kb' }));
  app.use(urlencoded({ extended: true, limit: '200kb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalFilters(new TmdbExceptionFilter());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
