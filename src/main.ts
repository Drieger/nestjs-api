import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    alwaysPaginate: true,
  },
});

import { AppModule } from './app.module';

async function bootstrap() {
  // Setting logger to console in production will avoid color codes to be printed
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV !== 'production' ? new Logger() : console,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // Only create swagger documentation if we are running in a development env
  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The API documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(process.env.PORT || 3000);
  Logger.log(`Server listening on port: ${process.env.PORT || 3000}`);
}
bootstrap();
