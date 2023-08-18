/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { files } from './entities/files.entity';
export declare class UploadFileService {
    private configService;
    private filesRepository;
    constructor(configService: ConfigService, filesRepository: Repository<files>);
    UploadFileToS3(file: Express.Multer.File): Promise<string>;
    generateShortUrlId(): string;
    findLongUrl(shortCode: string): Promise<string>;
    findAllLinks(): Promise<files[]>;
}
