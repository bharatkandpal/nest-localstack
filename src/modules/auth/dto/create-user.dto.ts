import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  @IsStrongPassword({ minLength: 6, minNumbers: 1, minLowercase: 1 })
  password: string;
}
