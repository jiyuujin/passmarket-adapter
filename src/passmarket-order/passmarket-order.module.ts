import { Module } from '@nestjs/common';
import { PassmarketOrderService } from './passmarket-order.service';

@Module({
  providers: [PassmarketOrderService],
  exports: [PassmarketOrderService],
})
export class PassmarketOrderModule {}
