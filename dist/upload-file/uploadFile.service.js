"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const files_entity_1 = require("./entities/files.entity");
const aws_sdk_1 = require("aws-sdk");
let UploadFileService = class UploadFileService {
    constructor(configService, filesRepository) {
        this.configService = configService;
        this.filesRepository = filesRepository;
    }
    async UploadFileToS3(file) {
        try {
            if (file) {
                const fileSizeBytes = file.size;
                const expectedSizeBytes = 20 * 1024 * 1024;
                if (fileSizeBytes > expectedSizeBytes) {
                    throw new common_1.BadRequestException("Total file size exceeds the limit of 20 MB.");
                }
                else {
                    const s3 = new aws_sdk_1.S3({
                        accessKeyId: this.configService.get("ACCESS_KEY_ID"),
                        secretAccessKey: this.configService.get("SECRET_ACCESS_KEY"),
                    });
                    const bucketName = `${this.configService.get("BUCKET_NAME")}`;
                    const uploadResult = await s3
                        .upload({
                        Bucket: bucketName,
                        Body: file.buffer,
                        Key: file.originalname,
                    })
                        .promise();
                    const shortCode = this.generateShortUrlId();
                    const shortUrl = `http://localhost:3002/farmart/${shortCode}`;
                    const fileData = new files_entity_1.files();
                    fileData.longUrl = uploadResult.Location;
                    fileData.shortCode = shortCode;
                    fileData.shortUrl = shortUrl;
                    await this.filesRepository.save(fileData);
                    return shortUrl;
                }
            }
            else {
                throw new common_1.BadRequestException("No file selected..");
            }
        }
        catch (error) {
            throw error;
        }
    }
    generateShortUrlId() {
        const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const base = alphabet.length;
        let num = Math.floor(Math.random() * Math.pow(base, 6));
        let shortUrlId = "";
        while (num > 0) {
            shortUrlId = alphabet[num % base] + shortUrlId;
            num = Math.floor(num / base);
        }
        return shortUrlId;
    }
    async findLongUrl(shortCode) {
        const { longUrl } = await this.filesRepository.findOne({
            where: { shortCode: shortCode },
        });
        return longUrl;
    }
    async findAllLinks() {
        try {
            const files = await this.filesRepository.find();
            if (files.length != 0) {
                return files;
            }
            else {
                throw new common_1.BadRequestException("No Links Found.");
            }
        }
        catch (error) {
            throw error;
        }
    }
};
UploadFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(files_entity_1.files)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], UploadFileService);
exports.UploadFileService = UploadFileService;
//# sourceMappingURL=uploadFile.service.js.map