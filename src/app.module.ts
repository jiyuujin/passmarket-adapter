import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfterPurchaseModule } from './after-purchase/after-purchase.module';

@Module({
  imports: [AfterPurchaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
