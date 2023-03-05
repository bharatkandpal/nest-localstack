import { Module } from '@nestjs/common';
import { DynamoDbClient } from '../../clients/dynamodb.client';
import { UserRepository } from '../dynamodb/repository/user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository, DynamoDbClient],
  exports: [UserService],
})
export class UserModule {}
