import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserFromJwt } from './models/user-from-jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { RtJwtAuthGuard } from './guards/rt-jwt-auth.guard';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsPublic()
  signup(
    @Body() createUserDto: CreateUserDto,
    @Headers('origin') origin: string,
  ) {
    delete createUserDto.passwordConfirmation;
    return this.authService.signup(createUserDto, origin);
  }

  @Post('signin')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  signin(@Request() request: AuthRequest) {
    return this.authService.signin(request.user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@CurrentUser() user: UserFromJwt) {
    return this.authService.logout(user.id);
  }

  @Get('me')
  me(@CurrentUser() user: UserFromJwt) {
    return user;
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  confirmEmail(@CurrentUser() user: UserFromJwt) {
    return this.authService.confirmEmail(user);
  }

  @Post('refresh-token')
  @IsPublic()
  @UseGuards(RtJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUser('email') email: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(email, refreshToken);
  }
}
