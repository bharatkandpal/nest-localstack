import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class LoginDto extends PartialType(CreateUserDto) {}