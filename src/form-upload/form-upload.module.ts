import { Module } from '@nestjs/common';
import { FormUploadController } from './form-upload.controller';
import { UploadB2Module } from 'src/upload-b2/upload-b2.module';

@Module({
  imports: [UploadB2Module],
  controllers: [FormUploadController],

})
export class FormUploadModule {}