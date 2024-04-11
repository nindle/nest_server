import { Controller, Post, Body } from '@nestjs/common';
import { WxService } from './wx.service';

@Controller('wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Post()
  async sendSubscribeMessage(@Body() body: any) {
    console.log(body);

    const { appId, appSecret } = body;
    return this.wxService.sendSubscribeMessage(appId, appSecret);
  }
}
