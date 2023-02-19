import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Logger } from '@nestjs/common';
import { DynamoDbClient } from '../../../clients/dynamodb.client';

export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private readonly tableName = 'users';
  constructor(private db: DynamoDbClient) {}
  async find(id: string) {
    try {
      const input: GetItemCommandInput = {
        TableName: this.tableName,
        Key: { id: { S: id } },
      };
      const user = await this.db.getClient().send(new GetItemCommand(input));
      return user?.Item;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
}
