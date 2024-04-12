import { Controller, Post, Body } from '@nestjs/common';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Post()
  async sendSubscribeMessage(@Body() body: any) {
    const { data, code } = body;
    return this.wxService.sendSubscribeMessage(data, code);
  }
}
