import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { JobsModule } from '../jobs/jobs.module';
import { RtJwtStrategy } from './strategies/rt-jwt.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule, JobsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtJwtStrategy],
  exports: [JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
