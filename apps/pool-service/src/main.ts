import { NestFactory } from '@nestjs/core';
import { PoolServiceModule } from './pool-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PoolServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
