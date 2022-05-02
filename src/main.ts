import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:
        true /* Automaticamente niega los atributos que no esten definidos en el DTO */,
      forbidNonWhitelisted:
        true /* Le coloca un error si se añaden datos adicionales */,
    }),
  );
  await app.listen(3000);
}
bootstrap();
