import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './config/format-response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  await app.listen(6200);
}
bootstrap();
