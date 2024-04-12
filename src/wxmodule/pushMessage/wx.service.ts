import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WxService {
  constructor(private httpService: HttpService) {}

  private async getAccessToken(
    appId: string,
    appSecret: string,
  ): Promise<string> {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw error;
    }
  }

  public async sendSubscribeMessage(data: object, code: string): Promise<any> {
    const accessToken = await this.getAccessToken(
      'wx7eebef0766987258',
      '6fce5237f28df7fa14dd114211b16b44',
    );
    const url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`;

    const wxData = await firstValueFrom(
      this.httpService.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=wx7eebef0766987258&secret=6fce5237f28df7fa14dd114211b16b44&js_code=${code}&grant_type=authorization_code`,
      ),
    );

    const body = {
      touser: wxData.data.openid,
      template_id: 'dtR3VQ16DtXKNMpqOZ7jeszVR71_V7k-ApkgU5bzXI8',
      page: 'pages/index/index',
      data: data,
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
