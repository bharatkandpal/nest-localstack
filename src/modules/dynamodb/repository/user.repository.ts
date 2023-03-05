import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDbClient } from '../../../clients/dynamodb.client';
import { CreateUserDto } from '../../auth/dto/create-user.dto';

export class UserRepository {
  private readonly tableName = 'users';
  constructor(private db: DynamoDbClient) {}
  async find(id: string) {
    const input: GetItemCommandInput = {
      TableName: this.tableName,
      Key: { id: { S: id } },
    };
    const user = await this.db.getClient().send(new GetItemCommand(input));
    return user?.Item;
  }
  async findByEmail(email: string) {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: 'applicationScholarshipIdStatusIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': {
          S: email,
        },
      },
    };
    const user = await this.db.getClient().send(new QueryCommand(params));
    if (user.Count == 0) {
      throw new NotFoundException();
    }
    return unmarshall(user.Items[0]);
  }

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: {
        id: id,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    };
    const data = await this.db.getClient().send(new PutItemCommand(params));
    delete createUserDto.password;
    return { id, ...createUserDto };
  }
}
