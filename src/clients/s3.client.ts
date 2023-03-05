import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
@Injectable()
export class S3Client {
  private readonly logger = new Logger(S3Client.name);
  private readonly s3Client: S3;
  constructor() {
    this.s3Client = new S3({
      region: process.env.AWS_REGION,
      endpoint: process.env.DYNAMODB_S3_URL,
      s3ForcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async uploadFile(file) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: String(file.originalname),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };
    try {
      const s3Response = await this.s3Client.upload(params).promise();
      return s3Response;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async createBucket() {
    try {
      const params = {
        Bucket: process.env.S3_BUCKET,
      };
      const bucket = await this.s3Client.createBucket(params).promise();
      return bucket;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
