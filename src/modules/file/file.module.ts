import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Client } from '../utils/aws-s3.util';

@Module({
  providers: [FileService, S3Client],
  controllers: [FileController],
})
export class FileModule {}
