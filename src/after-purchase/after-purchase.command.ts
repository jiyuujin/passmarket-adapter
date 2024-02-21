import { Logger } from '@nestjs/common';
import { CommandRunner, Command, Option } from 'nest-commander';
import { AfterPurchaseService } from './after-purchase.service';

type CommandOptions = {
  id?: number;
};

@Command({ name: 'after-purchase', description: 'A parameter parse' })
export class AfterPurchaseCommand extends CommandRunner {
  constructor(readonly afterPurchaseService: AfterPurchaseService) {
    super();
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    Logger.log({ passedParam, options }, AfterPurchaseCommand.name);
    this.afterPurchaseService.sendLineMessage();
    return Promise.resolve();
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }
}
