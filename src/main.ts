import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docBuilder = new DocumentBuilder()
    .setTitle('Document')
    .setDescription(' Rest API Document')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, docBuilder);
  app.use(
    '/doc',
    apiReference({
      content: document,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true // this is just for now
    })
  )
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
