import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(userService: UserService) {}
  register(createUserDto: CreateUserDto) {
    return 'This action registers a new user';
  }

  login(loginDto: LoginDto) {
    return 'login the user user';
  }
}
