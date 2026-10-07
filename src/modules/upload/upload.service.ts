import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private readonly logger = new Logger(UploadService.name);

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('aws.region');
    const accessKeyId = this.configService.get<string>('aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>('aws.secretAccessKey');

    if (accessKeyId && secretAccessKey) {
      this.s3 = new AWS.S3({
        region,
        accessKeyId,
        secretAccessKey,
      });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const bucketName = this.configService.get<string>('aws.bucketName');
    const fileKey = `uploads/${Date.now()}-${file.originalname}`;

    if (!this.s3 || !bucketName) {
      this.logger.warn('AWS S3 credentials not fully configured. Returning simulated local file URL.');
      return {
        url: `http://localhost:3000/uploads/${fileKey}`,
        key: fileKey,
      };
    }

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: bucketName,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        })
        .promise();

      return {
        url: uploadResult.Location,
        key: uploadResult.Key,
      };
    } catch (error) {
      this.logger.error(`S3 Upload failed: ${error.message}`);
      throw new BadRequestException(`Failed to upload file to S3: ${error.message}`);
    }
  }
}
