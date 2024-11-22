import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as YAML from 'yamljs';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    bufferLogs: true,
  });
  const logger = app.get(LoggingService);

  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  const document: OpenAPIObject = YAML.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
