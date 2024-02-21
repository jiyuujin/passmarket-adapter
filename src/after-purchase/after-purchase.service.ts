import { Injectable, Logger } from '@nestjs/common';
import { PassmarketOrderService } from '../passmarket-order/passmarket-order.service';

@Injectable()
export class AfterPurchaseService {
  private readonly logger = new Logger(AfterPurchaseService.name);

  constructor(readonly passmarketOrderService: PassmarketOrderService) {
    //
  }

  async sendLineMessage() {
    const orders = this.passmarketOrderService.getOrders();
    Logger.log(orders);
  }
}
