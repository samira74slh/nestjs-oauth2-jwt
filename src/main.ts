import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const config = app.get(ConfigService);
  const port = config.get('port');
  const server = await app.listen(+port, async () => {
    Logger.log(`Application is running on:${await app.getUrl()}`);
  });
  server.setTimeout(1800000); // 30 minutes(n/60000)
}
bootstrap();
