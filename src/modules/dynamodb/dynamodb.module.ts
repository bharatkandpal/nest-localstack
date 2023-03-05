import { Module } from '@nestjs/common';
import { DynamoDbClient } from '../../clients/dynamodb.client';
import { DynamoDbController } from './dynamodb.controller';
import { DynamoDbService } from './dynamodb.service';

@Module({
  controllers: [DynamoDbController],
  providers: [DynamoDbService, DynamoDbClient],
})
export class DynamodbModule {}
