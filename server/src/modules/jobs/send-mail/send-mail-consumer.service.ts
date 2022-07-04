import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { MailNewUserConfirmationService } from '../../mail/mail-new-user-confirmation/mail-new-user-confirmation.service';

@Processor('mail')
export class SendMailConsumerService {
  constructor(private readonly mailerService: MailNewUserConfirmationService) {}

  @Process('send-mail-confirmation')
  async sendMailConfirmation(job: Job<ISendMailOptions>) {
    const { data } = job;
    await this.mailerService.sendMailConfirmation(data);
  }
}
