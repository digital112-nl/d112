import { Controller, Get, Returns } from '@tsed/common';

@Controller('/test')
export class TestController {
  @Get()
  @Returns(String)
  public async example() {
    return 'example response';
  }
}
