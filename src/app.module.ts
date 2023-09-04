import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadB2Module } from './upload-b2/upload-b2.module';
import { FormUploadModule } from './form-upload/form-upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),UploadB2Module, 
    FormUploadModule , 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}