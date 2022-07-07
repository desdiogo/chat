import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailRepository } from '../mail/repositories/mail.repository';

@Injectable()
export class CronService {
  constructor(private readonly mailRepository: MailRepository) {}
  private readonly logger = new Logger(CronService.name);

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async deleteEmailLastDayDate() {
    try {
      await this.mailRepository.deleteEmailLastDayDate();
      this.logger.log(`Deleted  mail`);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
