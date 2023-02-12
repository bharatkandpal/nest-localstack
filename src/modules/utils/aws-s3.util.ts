import {
  CreateBucketCommand,
  CreateBucketCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { s3Client } from './s3.client';

@Injectable()
export class S3Util {
  private logger = new Logger(S3Util.name);
  async uploadFile(file) {
    const { originalname } = file;
    await this.s3_upload(
      file.buffer,
      process.env.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params: PutObjectCommandInput = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    console.log(params);

    try {
      const s3Response = await s3Client.send(new PutObjectCommand(params));
      this.logger.log(s3Response);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async createBucket() {
    const params: CreateBucketCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
    };
    try {
      const bucket = await s3Client.send(new CreateBucketCommand(params));
      this.logger.log(bucket);
      return bucket.Location;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
