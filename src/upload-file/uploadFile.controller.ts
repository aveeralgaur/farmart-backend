import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './uploadFile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { files } from './entities/files.entity';

@Controller('farmart')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: any,
  ): Promise<string> {
    const shortUrl = await this.uploadFileService.UploadFileToS3(file);
    return res.status(HttpStatus.OK).json(shortUrl);
  }

  @Get('allLinks')
  async findAllLinks(): Promise<files[]> {
    return await this.uploadFileService.findAllLinks();
  }

  @Get(':shortCode')
  @Redirect('Downloading') // Specify the redirection options here
  async redirectToLongUrl(
    @Param('shortCode') shortCode: string,
  ): Promise<object> {
    const longUrl = await this.uploadFileService.findLongUrl(shortCode);
    return { url: longUrl, statusCode: 302 };
  }
}
