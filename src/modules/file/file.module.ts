import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Util } from '../utils/aws-s3.util';

@Module({
  providers: [FileService, S3Util],
  controllers: [FileController],
})
export class FileModule {}
