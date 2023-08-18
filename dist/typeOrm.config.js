"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const files_entity_1 = require("./upload-file/entities/files.entity");
const getDatabaseConfig = async (configService) => {
    return {
        type: 'mysql',
        host: configService.get('DB_HOSTNAME') || 'localhost',
        port: configService.get('DB_PORT') || 3306,
        username: configService.get('DB_USERNAME') || 'root',
        password: configService.get('DB_PASSWORD') || 'password',
        database: configService.get('DB_NAME') || 'farmart',
        entities: ['dist/**/*.entity{.ts,.js}', files_entity_1.files],
        synchronize: true,
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=typeOrm.config.js.map