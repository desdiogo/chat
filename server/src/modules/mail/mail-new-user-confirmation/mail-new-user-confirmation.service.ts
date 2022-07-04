import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailNewUserConfirmationService {
  constructor(private readonly mailService: MailerService) {}

  async sendMailConfirmation(sendMailOptions: ISendMailOptions) {
    try {
      return this.mailService.sendMail(sendMailOptions);
    } catch (error) {
      console.log('error', error);
    }
  }
}
