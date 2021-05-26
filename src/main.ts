import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: 'content-type, authorization',
    methods: 'GET, POST, PUT, DELETE',
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
