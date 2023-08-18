import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { files } from "./upload-file/entities/files.entity";

export const getDatabaseConfig = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "mysql",
    host: configService.get<string>("DB_HOSTNAME") || "sql.freedb.tech",
    port: configService.get<number>("DB_PORT") || 3306,
    username:
      configService.get<string>("DB_USERNAME") || "freedb_file-upload-user",
    password: configService.get<string>("DB_PASSWORD") || "KQkS*fD#S!S2fpM",
    database: configService.get<string>("DB_NAME") || "freedb_fileupload",
    entities: ["dist/**/*.entity{.ts,.js}", files],
    synchronize: true,
  };
};
