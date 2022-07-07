import { Injectable } from '@nestjs/common';
import { MailRepository } from './repositories/mail.repository';
import { Mail } from '../../enums';

@Injectable()
export class MailService {
  constructor(private readonly mailRepository: MailRepository) {}

  async exceededSendingLimit() {
    const countSentMailToday = await this.mailRepository.countEmailTodayDate();
    return countSentMailToday > Mail.MaxSentEmailLimit;
  }
}
