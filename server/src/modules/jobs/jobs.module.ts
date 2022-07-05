import { Module } from '@nestjs/common';
import { SendMailProducerService } from './send-mail/send-mail-producer.service';
import { SendMailConsumerService } from './send-mail/send-mail-consumer.service';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [SendMailProducerService, SendMailConsumerService],
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables, true>,
      ) => ({
        redis: {
          path: configService.get('REDIS_URL', { infer: true }),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailModule,
  ],
  exports: [SendMailProducerService],
})
export class JobsModule {}
