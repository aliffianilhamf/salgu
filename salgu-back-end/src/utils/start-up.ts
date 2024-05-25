import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from '../app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import loadConfig from '../config/configuration';
import { setupSwagger } from 'src/utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/errors/app-error.filter';

export type CreationOptions = {
  expressInstance?: express.Express;
  config?: any;
};

/**
 * Create a new (uninitialized) NestJS application instance.
 */
export const createAppInstance = async ({
  expressInstance,
  config = loadConfig(),
}: CreationOptions = {}) => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    expressInstance ? new ExpressAdapter(expressInstance) : undefined,
  );

  if (config.http.trust_proxy)
    app.set('trust proxy', config.http.trust_proxy as boolean);

  app.use(helmet());

  if (config.swagger?.enabled) setupSwagger(app, config.swagger?.path);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const corsOptions: CorsOptions = {};
  if (config?.cors?.whitelist) {
    corsOptions.origin = config.cors.whitelist;
  }
  app.enableCors(corsOptions);

  return app;
};
