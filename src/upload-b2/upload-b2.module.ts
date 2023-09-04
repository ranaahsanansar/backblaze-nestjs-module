import { Module } from '@nestjs/common';
import { UploadB2Service } from './upload-b2.service';
import { FileUploadB2Service } from './file-upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: [UploadB2Service , FileUploadB2Service],
  exports: [FileUploadB2Service]
})
export class UploadB2Module {}
