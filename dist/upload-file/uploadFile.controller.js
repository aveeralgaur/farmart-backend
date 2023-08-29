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
exports.UploadFileController = void 0;
const common_1 = require("@nestjs/common");
const uploadFile_service_1 = require("./uploadFile.service");
const platform_express_1 = require("@nestjs/platform-express");
let UploadFileController = class UploadFileController {
    constructor(uploadFileService) {
        this.uploadFileService = uploadFileService;
    }
    async uploadFile(file, res) {
        const shortUrl = await this.uploadFileService.UploadFileToS3(file);
        return res.status(common_1.HttpStatus.OK).json(shortUrl);
    }
    async findAllLinks() {
        return await this.uploadFileService.findAllLinks();
    }
    async redirectToLongUrl(shortCode) {
        const longUrl = await this.uploadFileService.findLongUrl(shortCode);
        return { url: longUrl, statusCode: 302 };
    }
};
__decorate([
    (0, common_1.Post)('uploadFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('allLinks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "findAllLinks", null);
__decorate([
    (0, common_1.Get)(':shortCode'),
    (0, common_1.Redirect)('Downloading'),
    __param(0, (0, common_1.Param)('shortCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadFileController.prototype, "redirectToLongUrl", null);
UploadFileController = __decorate([
    (0, common_1.Controller)('farmart'),
    __metadata("design:paramtypes", [uploadFile_service_1.UploadFileService])
], UploadFileController);
exports.UploadFileController = UploadFileController;
//# sourceMappingURL=uploadFile.controller.js.map