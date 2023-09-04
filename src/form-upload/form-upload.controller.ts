import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadB2Service } from 'src/upload-b2/file-upload.service';

@Controller('form-upload')
export class FormUploadController {

    constructor(private readonly fileUploadService: FileUploadB2Service) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        console.log("Hye")
        if (!file) {
            throw new Error("No file Uploaded")
        }

        try {
            const uploadResponse = await this.fileUploadService.uploadFileToBackBlaze(file);
            console.log(uploadResponse)
            return "File Uploaded Successfully "
        } catch (err) {
            throw new HttpException(err.message , HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}