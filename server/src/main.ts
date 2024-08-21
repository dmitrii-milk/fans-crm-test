import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableCors({
    origin: false,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
}
bootstrap();
