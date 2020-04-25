import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Setting logger to console in production will avoid color codes to be printed
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV !== 'production' ? new Logger() : console,
  });

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
