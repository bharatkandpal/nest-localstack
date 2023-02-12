import { Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  private logger = new Logger(FileController.name);
  constructor(private fileService: FileService) {}
  @Post('/bucket')
  async createBucket(@Res() response: Response) {
    try {
      this.fileService.createBucket();
      return response.status(HttpStatus.CREATED).send();
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
