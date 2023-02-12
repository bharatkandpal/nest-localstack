import { Injectable } from '@nestjs/common';
import { S3Util } from '../utils/aws-s3.util';

@Injectable()
export class FileService {
  constructor(private s3Util: S3Util) {}

  async upload(uploadFileDto) {
    return this.s3Util.uploadFile(uploadFileDto.file);
  }
  async createBucket() {
    return this.s3Util.createBucket();
  }
}
