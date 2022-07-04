import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomMatchPasswords } from '../../../common/validators/custom-match-passwords';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirmation: string;
}
