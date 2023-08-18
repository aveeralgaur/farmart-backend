import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { files } from "./entities/files.entity";
import { S3 } from "aws-sdk";

@Injectable()
export class UploadFileService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(files)
    private filesRepository: Repository<files>
  ) {}

  async UploadFileToS3(file: Express.Multer.File): Promise<string> {
    try {
      if (file) {
        const fileSizeBytes = file.size;
        const expectedSizeBytes = 20 * 1024 * 1024; // 20 MB in bytes
        if (fileSizeBytes > expectedSizeBytes) {
          throw new BadRequestException(
            "Total file size exceeds the limit of 20 MB."
          );
        } else {
          const s3 = new S3({
            accessKeyId: this.configService.get<string>("ACCESS_KEY_ID"),
            secretAccessKey:
              this.configService.get<string>("SECRET_ACCESS_KEY"),
          });
          const bucketName = `${this.configService.get<string>("BUCKET_NAME")}`;
          const uploadResult = await s3
            .upload({
              Bucket: bucketName,
              Body: file.buffer,
              Key: file.originalname,
            })
            .promise();
          const shortCode = this.generateShortUrlId();
          const shortUrl = `http://localhost:3002/farmart/${shortCode}`;
          const fileData = new files();
          fileData.longUrl = uploadResult.Location;
          fileData.shortCode = shortCode;
          fileData.shortUrl = shortUrl;
          await this.filesRepository.save(fileData);
          return shortUrl;
        }
      } else {
        throw new BadRequestException("No file selected..");
      }
    } catch (error) {
      throw error;
    }
  }

  generateShortUrlId() {
    const alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const base = alphabet.length;
    let num = Math.floor(Math.random() * Math.pow(base, 6)); // 6 characters
    let shortUrlId = "";
    while (num > 0) {
      shortUrlId = alphabet[num % base] + shortUrlId;
      num = Math.floor(num / base);
    }
    return shortUrlId;
  }

  async findLongUrl(shortCode: string): Promise<string> {
    const { longUrl } = await this.filesRepository.findOne({
      where: { shortCode: shortCode },
    });
    return longUrl;
  }

  async findAllLinks(): Promise<files[]> {
    try {
      const files = await this.filesRepository.find();
      if (files.length != 0) {
        return files;
      } else {
        throw new BadRequestException("No Links Found.");
      }
    } catch (error) {
      throw error;
    }
  }
}
