import { Module } from '@nestjs/common';
import { UploadFileController } from './uploadFile.controller';
import { UploadFileService } from './uploadFile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { files } from './entities/files.entity';

@Module({
  imports: [TypeOrmModule.forFeature([files])],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
