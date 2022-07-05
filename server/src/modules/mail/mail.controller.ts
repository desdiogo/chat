import { Body, Controller, Get } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailerService) {}

  @IsPublic()
  @Get()
  sendmail(@Body() email: string) {
    console.log(email);

    const mail = {
      to: email,
      subject: 'Chat - Confirm email',
      template: 'confirm-email',
      context: {
        token: '556565656fdfdfdfdf',
        route: 'auth/confirm-email',
      },
    };

    return this.mailService.sendMail(mail);
  }
}
