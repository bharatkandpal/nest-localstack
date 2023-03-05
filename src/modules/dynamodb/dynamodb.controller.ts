import { Controller, Post } from '@nestjs/common';
import { DynamoDbService } from './dynamodb.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('dynamodb')
@ApiTags('DynamoDb')
export class DynamoDbController {
  constructor(private readonly dDbService: DynamoDbService) {}
  @Post('/initialize')
  async create() {
    return this.dDbService.initializeTables();
  }
}
