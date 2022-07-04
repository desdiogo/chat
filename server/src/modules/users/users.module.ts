import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [JobsModule],
  exports: [UsersRepository],
})
export class UsersModule {}
