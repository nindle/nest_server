import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';

@Module({
  imports: [HttpModule],
  controllers: [WxController],
  providers: [WxService],
})
export class WxModule {}
