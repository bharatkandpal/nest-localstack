import { CreateTableInput } from '@aws-sdk/client-dynamodb';
export const postTableParams: CreateTableInput = {
  TableName: 'posts',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, //hash: partition key, range: sort key
  ],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};
