import { Injectable } from '@nestjs/common';

@Injectable()
export class PoolServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
