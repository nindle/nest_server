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
  app.enableCors({
    origin: ['https://nindle.me', 'http://192.168.1.4:8000'], // 更换为你的前端域名
    methods: 'GET,POST,PUT,DELETE', // 根据需要配置允许的请求方法
    // allowedHeaders: 'Content-Type, Authorization', // 根据需要配置允许的头部
    // credentials: true, // 如果需要支持发送 Cookie，启用此项
  });
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  await app.listen(6200);
}
bootstrap();
