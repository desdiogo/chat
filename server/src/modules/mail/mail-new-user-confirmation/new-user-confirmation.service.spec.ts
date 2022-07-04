import { Test, TestingModule } from '@nestjs/testing';
import { MailNewUserConfirmationService } from './mail-new-user-confirmation.service';

describe('NewUserConfirmationService', () => {
  let service: MailNewUserConfirmationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailNewUserConfirmationService],
    }).compile();

    service = module.get<MailNewUserConfirmationService>(
      MailNewUserConfirmationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
