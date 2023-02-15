import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
  Headers,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { UploadFileDTO } from './dto/upload-file.dto';
import { FileService } from './file.service';
@Controller('file')
export class FileController {
  private logger = new Logger(FileController.name);
  constructor(private fileService: FileService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), //using memoryStorage to get file buffer
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDTO,
    @Res() response: Response,
  ) {
    try {
      uploadFileDto.file = file;
      const uploadResponse = await this.fileService.upload(uploadFileDto);
      return response.status(HttpStatus.CREATED).json(uploadResponse).send();
    } catch (error) {
      this.logger.error(error);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(error)
        .send();
    }
  }

  //need to run it only once
  @Post('/create-bucket')
  async createBucket(
    @Headers('x-bucket-secret') secret: string,
    @Res() response: Response,
  ) {
    try {
      // only the ones with the knowledge of bucket secret will be able to create this bucket
      if (secret !== process.env.BUCKET_SECRET) {
        throw new BadRequestException("Can't do the requested operation");
      }
      const bucket = await this.fileService.createBucket();
      return response.status(HttpStatus.CREATED).json(bucket).send();
    } catch (error) {
      this.logger.error(error);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(error)
        .send();
    }
  }
}
