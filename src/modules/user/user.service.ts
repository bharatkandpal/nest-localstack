import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserRepository } from '../dynamodb/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
