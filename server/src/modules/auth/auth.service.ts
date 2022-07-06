import { UserPayload } from './models/user-payload';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { UnauthorizedError } from '../../errors/types/unauthorized.error';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repositories/users.repository';
import { UserFromJwt } from './models/user-from-jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SendMailProducerService } from '../jobs/send-mail/send-mail-producer.service';
import { Tokens } from './models/tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables, true>,
    private readonly mailerService: SendMailProducerService,
    private readonly repository: UsersRepository,
  ) {}

  async signup(createUserDto: CreateUserDto, origin: string) {
    createUserDto.password = await this.hashString(createUserDto.password);
    const user = await this.repository.create(createUserDto);
    const token = await this.jwtService.signAsync(user, {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME', { infer: true }),
      secret: this.configService.get('JWT_SECRET', { infer: true }),
    });

    const mail = {
      to: user.email,
      subject: 'Chat - Confirm email',
      template: 'confirm-email',
      context: {
        token,
        origin,
        route: 'confirm-email',
      },
    };

    await this.mailerService.sendMailConfirmation(mail);

    return {
      message: 'User created successfully, confirmation email sent.',
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    delete user.password;

    return user;
  }

  async getTokens(user: UserFromJwt): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
          emailVerifiedAt: user.emailVerifiedAt,
        },
        {
          expiresIn: this.configService.get('JWT_EXPIRATION_TIME', {
            infer: true,
          }),
          secret: this.configService.get('JWT_SECRET', { infer: true }),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
          emailVerifiedAt: user.emailVerifiedAt,
        },
        {
          expiresIn: this.configService.get('RT_JWT_EXPIRATION_TIME', {
            infer: true,
          }),
          secret: this.configService.get('RT_JWT_SECRET', { infer: true }),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signin(user: UserFromJwt) {
    if (!user.emailVerifiedAt) {
      throw new UnauthorizedError('Email not verified');
    }

    const { accessToken, refreshToken } = await this.getTokens(user);
    const hashRefreshToken = await this.hashString(refreshToken);

    await this.repository.updateHashRefreshToken(user.id, hashRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashString(data: string) {
    return argon.hash(data, { saltLength: 10 });
  }

  async confirmEmail(user: UserFromJwt) {
    await this.repository.updateEmailVerifiedAt(user.id);
    return {
      message: 'Email confirmed successfully',
    };
  }

  async logout(userId: string) {
    await this.repository.updateHashRefreshToken(userId);
    return {
      message: 'Logout successfully',
    };
  }

  async refreshTokens(email: string, refreshToken: string): Promise<Tokens> {
    const user = await this.repository.findByEmail(email);
    const refershTokenMatches = await argon.verify(
      user.hashRefreshToken,
      refreshToken,
    );
    if (!refershTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    const hashRefreshToken = await this.hashString(tokens.refreshToken);
    await this.repository.updateHashRefreshToken(user.id, hashRefreshToken);

    return tokens;
  }
}
