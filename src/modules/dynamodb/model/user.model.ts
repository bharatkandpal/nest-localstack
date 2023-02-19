import { CreateTableInput } from '@aws-sdk/client-dynamodb';
export const userTableParams: CreateTableInput = {
  TableName: 'users',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, //hash: partition key, range: sort key
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: '_idxUserEmail',
      KeySchema: [{ AttributeName: 'email', KeyType: 'HASH' }],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: { ReadCapacityUnits: 2, WriteCapacityUnits: 2 },
    },
  ],

  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'email', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};
