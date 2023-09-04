import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UploadB2Service } from "./upload-b2.service";

export interface CustomFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  }

@Injectable()
export class FileUploadB2Service {
    constructor (private readonly uploadB2: UploadB2Service){
    }

    // Take a file and Upload to back blaze B2 
    async uploadFileToBackBlaze(file: CustomFile){
        try {
            await this.uploadB2.authorizeB2()
        const bucketId = process.env.BUCKET_ID;

        const fileName = `${Date.now()}-${file.originalname}` ;
        const fileData = file.buffer;
            const uploadResponse  = await this.uploadB2.uploadFile(bucketId , fileName , fileData);
            // console.log('File Uploaded to Backblaze B2: ' , uploadResponse);
            return uploadResponse
        }catch(err){
            console.log("Error in  uploadFileToBackBlaze");
            throw new HttpException(err.message , HttpStatus.INTERNAL_SERVER_ERROR )
        }
    }
} 