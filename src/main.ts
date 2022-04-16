import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const port = config.get('SERVER_PORT');
  await app.listen(Number(port));
  logger.log(`App listening on port ${port}`);
}
bootstrap();
