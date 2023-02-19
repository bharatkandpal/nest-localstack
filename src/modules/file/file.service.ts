import { Injectable } from '@nestjs/common';
import { S3Client } from '../../clients/s3.client';

@Injectable()
export class FileService {
  constructor(private s3Client: S3Client) {}

  async upload(uploadFileDto) {
    return this.s3Client.uploadFile(uploadFileDto.file);
  }
  async createBucket() {
    return this.s3Client.createBucket();
  }
}
