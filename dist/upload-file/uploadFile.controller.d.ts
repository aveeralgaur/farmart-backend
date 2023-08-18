/// <reference types="multer" />
import { UploadFileService } from './uploadFile.service';
import { files } from './entities/files.entity';
export declare class UploadFileController {
    private readonly uploadFileService;
    constructor(uploadFileService: UploadFileService);
    uploadFile(file: Express.Multer.File, res: any): Promise<string>;
    findAllLinks(): Promise<files[]>;
    redirectToLongUrl(shortCode: string): Promise<object>;
}
