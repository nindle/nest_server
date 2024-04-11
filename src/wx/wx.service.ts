import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // RxJS 7.x版本中，toPromise已被弃用，改为使用firstValueFrom

@Injectable()
export class WxService {
  constructor(private httpService: HttpService) {}

  private async getAccessToken(
    appId: string,
    appSecret: string,
  ): Promise<string> {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url)); // 修改为使用firstValueFrom
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw error;
    }
  }

  public async sendSubscribeMessage(
    openId: string,
    data: object,
  ): Promise<any> {
    const accessToken = await this.getAccessToken(
      'wx7eebef0766987258',
      '6fce5237f28df7fa14dd114211b16b44',
    );
    const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`;

    const body = {
      touser: openId,
      template_id: 'dtR3VQ16DtXKNMpqOZ7jeszVR71_V7k-ApkgU5bzXI8',
      page: 'pages/index/index',
      data,
    };

    try {
      const response = await firstValueFrom(this.httpService.post(url, body)); // 修改为使用firstValueFrom
      return response.data;
    } catch (error) {
      console.error('Failed to send subscribe message:', error);
      throw error;
    }
  }
}
