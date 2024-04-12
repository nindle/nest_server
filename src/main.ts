import * as fs from 'fs';
import * as https from 'https';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './config/format-response.interceptor';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  await app.listen(6200);
}
bootstrap();
