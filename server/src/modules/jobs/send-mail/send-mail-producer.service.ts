import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('mail') private readonly queue: Queue) {}

  async sendMailConfirmation(sendMailOptions: ISendMailOptions) {
    await this.queue.add('send-mail-confirmation', sendMailOptions);
  }
}
