import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDTO {
  // this decorator is to include file upload in swagger doc
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
