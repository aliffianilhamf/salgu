import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

/**
 * Setup swagger on a nest application.
 */
export const setupSwagger = (app: INestApplication, path = 'api-docs') => {
  const config = new DocumentBuilder()
    .setTitle('SALGU API')
    .setVersion('0.0')
    .build();
  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(path, app, document);
};
