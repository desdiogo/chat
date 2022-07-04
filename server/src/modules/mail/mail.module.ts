import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailNewUserConfirmationService } from './mail-new-user-confirmation/mail-new-user-confirmation.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        transport: {
          host: configService.get('MAIL_HOST', { infer: true }),
          port: configService.get('MAIL_PORT', { infer: true }),
          auth: {
            user: configService.get('MAIL_USER', { infer: true }),
            pass: configService.get('MAIL_PASSWORD', { infer: true }),
          },
        },
        defaults: {
          from: configService.get('MAIL_FROM', { infer: true }),
        },
        template: {
          dir: process.cwd() + '/src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailNewUserConfirmationService],
  exports: [MailNewUserConfirmationService],
})
export class MailModule {}
