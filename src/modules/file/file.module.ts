import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Client } from '../../clients/s3.client';

@Module({
  providers: [FileService, S3Client],
  controllers: [FileController],
})
export class FileModule {}
