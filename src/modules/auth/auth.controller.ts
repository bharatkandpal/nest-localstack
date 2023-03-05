import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const data = await this.authService.register(createUserDto);
      return response
        .status(HttpStatus.CREATED)
        .json({
          message: 'Registered successfully',
          data: data,
          timestamp: Date.now(),
        })
        .send();
    } catch (e) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: e.message,
          data: 'unable to login at the moment',
          timestamp: Date.now(),
        })
        .send();
    }
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const data = await this.authService.login(loginDto);
      return response
        .status(HttpStatus.OK)
        .json({
          message: 'Logged in successfully',
          data: data,
          timestamp: Date.now(),
        })
        .send();
    } catch (e) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: e.message,
          data: 'unable to login at the moment',
          timestamp: Date.now(),
        })
        .send();
    }
  }
}
