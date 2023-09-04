// backblaze.service.ts

import { Injectable } from '@nestjs/common';
import * as B2 from 'b2';
import axios from 'axios';

@Injectable()
export class BackblazeService {
  private b2Client: B2;

  constructor() {
    this.b2Client = new B2({
      applicationKeyId: 'YOUR_APPLICATION_KEY_ID',
      applicationKey: 'YOUR_APPLICATION_KEY',
    });
  }

  async authorizeB2() {
    try {
      await this.b2Client.authorize();
      console.log('Backblaze B2 authorized successfully');
    } catch (error) {
      console.error('Error authorizing Backblaze B2:', error);
      throw error;
    }
  }

  async createFolder(bucketId: string, folderName: string) {
    try {
      // Construct the API endpoint to create a folder
      const apiUrl = `https://api.backblazeb2.com/b2api/v2/b2_create_folder`;

      // Construct the request payload
      const requestData = {
        bucketId,
        folderName,
      };

      // Perform the HTTP POST request to create the folder
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: this.b2Client.getAuthHeader(),
        },
      });

      console.log('Folder created successfully:', response.data);
      return 'Folder created successfully';
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }
}
