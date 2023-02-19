import { Injectable } from '@nestjs/common';
import { DynamoDbClient } from '../../clients/dynamodb.client';
import { commentTableParams } from './model/comment.model';
import { postTableParams } from './model/post.model';
import { userTableParams } from './model/user.model';

@Injectable()
export class DynamoDbService {
  constructor(private dDbClient: DynamoDbClient) {}
  listTables() {
    return this.dDbClient.listTables();
  }
  initializeTables() {
    return this.dDbClient.initializeTables(
      userTableParams,
      postTableParams,
      commentTableParams,
    );
  }
}
