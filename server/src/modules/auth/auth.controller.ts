import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Query,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsPublic()
  signup(@Body() createUserDto: CreateUserDto) {
    delete createUserDto.passwordConfirmation;
    return this.authService.signup(createUserDto);
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

  @Get('confirm-email')
  @IsPublic()
  confirmEmail(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
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
