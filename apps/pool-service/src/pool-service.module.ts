import { Module } from '@nestjs/common';
import { PoolServiceController } from './pool-service.controller';
import { PoolServiceService } from './pool-service.service';

@Module({
  imports: [],
  controllers: [PoolServiceController],
  providers: [PoolServiceService],
})
export class PoolServiceModule {}
