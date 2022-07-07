import { Injectable} from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MailRepository } from '../repositories/mail.repository';

@Injectable()
export class MailNewUserConfirmationService {
  constructor(
    private readonly mailService: MailerService,
    private readonly mailRepository: MailRepository,
  ) {}

  async sendMailConfirmation(sendMailOptions: ISendMailOptions) {
    try {
      const mail = await this.mailService.sendMail(sendMailOptions);
      await this.mailRepository.newEmail(sendMailOptions.from as string);
      return mail;
    } catch (error) {
      console.log('error', error);
    }
  }
}
