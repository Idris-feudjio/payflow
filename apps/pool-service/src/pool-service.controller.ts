import { Controller, Get } from '@nestjs/common';
import { PoolServiceService } from './pool-service.service';

@Controller()
export class PoolServiceController {
  constructor(private readonly poolServiceService: PoolServiceService) {}

  @Get()
  getHello(): string {
    return this.poolServiceService.getHello();
  }
}
