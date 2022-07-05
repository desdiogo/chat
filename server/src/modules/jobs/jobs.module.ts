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
          host: configService.get('REDIS_HOST', { infer: true }),
          port: configService.get('REDIS_PORT', { infer: true }),
          password: configService.get('REDIS_PASSWORD', { infer: true }),
          username: configService.get('REDIS_USER', { infer: true }),
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
