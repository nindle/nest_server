import { Test, TestingModule } from '@nestjs/testing';
import { WxController } from './wx.controller';
import { WxService } from './wx.service';
import { WxModule } from './wx.module';

describe('WxController', () => {
  let controller: WxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WxModule],
      controllers: [WxController],
      providers: [WxService],
    }).compile();

    controller = module.get<WxController>(WxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
