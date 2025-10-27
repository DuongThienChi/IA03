import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0)
    : undefined;

  const origin =
    allowedOrigins && allowedOrigins.length > 0
      ? allowedOrigins.includes('*')
        ? '*'
        : allowedOrigins
      : '*';

  app.enableCors({
    origin,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
