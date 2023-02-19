import { CreateTableInput } from '@aws-sdk/client-dynamodb';
export const commentTableParams: CreateTableInput = {
  TableName: 'comments',
  KeySchema: [
    { AttributeName: 'post_id', KeyType: 'HASH' }, //hash: partition key, range: sort key
    { AttributeName: 'id', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'post_id', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};
