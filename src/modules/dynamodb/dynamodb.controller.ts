import { Controller, Post } from '@nestjs/common';
import { DynamoDbService } from './dynamodb.service';

@Controller('dynamodb')
export class DynamoDbController {
  constructor(private readonly dDbService: DynamoDbService) {}
  @Post('/initialize')
  async create() {
    return this.dDbService.initializeTables();
  }
}
