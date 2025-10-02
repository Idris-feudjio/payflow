import { Test, TestingModule } from '@nestjs/testing';
import { PoolServiceController } from './pool-service.controller';
import { PoolServiceService } from './pool-service.service';

describe('PoolServiceController', () => {
  let poolServiceController: PoolServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PoolServiceController],
      providers: [PoolServiceService],
    }).compile();

    poolServiceController = app.get<PoolServiceController>(PoolServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(poolServiceController.getHello()).toBe('Hello World!');
    });
  });
});
