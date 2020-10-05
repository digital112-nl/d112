import { Controller, Get, Returns } from '@tsed/common';

@Controller("/intents")
export class IntentsController {
  @Get()
  @Returns(String)
  public async example() {
    return 'Please select a specific object inside the URL path';
  }
}