import { Module } from '@nestjs/common';
import { AfterPurchaseCommand } from './after-purchase.command';

@Module({
  providers: [AfterPurchaseCommand],
})
export class AfterPurchaseModule {}
