import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
  }
  async register(createUserDto: CreateUserDto) {
    try {
      const emailExists = await this.userService.findByEmail(
        createUserDto.email,
      );
      if (emailExists !== null) {
        throw new BadRequestException('Email already exists');
      }
      createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
      const user = await this.userService.create(createUserDto);
      return this.generateToken(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findByEmail(loginDto.email);
      console.log(user);
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new BadRequestException('incorrect credentials');
      }
      return this.generateToken(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
