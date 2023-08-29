import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { files } from "./upload-file/entities/files.entity";

export const getDatabaseConfig = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "mysql",
    host:
      configService.get<string>("DB_HOSTNAME") ||
      "containers-us-west-78.railway.app",
    port: configService.get<number>("DB_PORT") || 7899,
    username: configService.get<string>("DB_USERNAME") || "root",
    password:
      configService.get<string>("DB_PASSWORD") || "ZLeyBv94UuPElNdoDViF",
    database: configService.get<string>("DB_NAME") || "railway",
    entities: ["dist/**/*.entity{.ts,.js}", files],
    synchronize: true,
  };
};
