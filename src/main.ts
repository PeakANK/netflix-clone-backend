import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const appName = configService.get<string>('APP_NAME') || 'Nest Backend App';

  await app.listen(port);
  console.log(`🚀 ${appName} is running on http://localhost:${port}`);
}
bootstrap();