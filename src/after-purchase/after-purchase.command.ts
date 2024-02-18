import { Logger } from '@nestjs/common';
import { CommandRunner, Command, Option } from 'nest-commander';

type CommandOptions = {
  id?: number;
};

@Command({ name: 'after-purchase', description: 'A parameter parse' })
export class AfterPurchaseCommand extends CommandRunner {
  constructor() {
    super();
  }

  async run(passedParam: string[], options?: CommandOptions): Promise<void> {
    Logger.log({ passedParam, options }, AfterPurchaseCommand.name);
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
