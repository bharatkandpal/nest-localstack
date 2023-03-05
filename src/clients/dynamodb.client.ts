import {
  DynamoDBClient,
  CreateTableInput,
  ListTablesCommand,
  CreateTableCommandInput,
  CreateTableCommand,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Logger } from '@nestjs/common';

export class DynamoDbClient {
  private readonly logger = new Logger(DynamoDBClient.name);

  private readonly db;
  private readonly dDbClient: DynamoDBDocumentClient;
  constructor() {
    this.db = new DynamoDBClient({
      region: process.env.AWS_REGION,
      endpoint: process.env.DYNAMODB_URL,
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      // },
    });
    this.dDbClient = DynamoDBDocumentClient.from(this.db, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
      unmarshallOptions: { wrapNumbers: true },
    });
  }
  getClient() {
    return this.dDbClient;
  }
  async listTables() {
    try {
      const tables = await this.getClient().send(new ListTablesCommand({}));
      return tables;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
  async initializeTables(...params: CreateTableInput[]) {
    try {
      const existingTables = await this.listTables();
      if (!existingTables || existingTables.TableNames.length === 0) {
        return this.createTables(params);
      }
      const tablesToCreate = params.filter((p) => {
        !existingTables.TableNames.includes(p.TableName);
      });
      return this.createTables(tablesToCreate);
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
  async createTables(createTableParams: CreateTableCommandInput[]) {
    try {
      const createdTables = [];
      for (const tableParams of createTableParams) {
        await this.getClient().send(new CreateTableCommand(tableParams));
        createdTables.push(tableParams.TableName);
      }
      return createdTables;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
}
