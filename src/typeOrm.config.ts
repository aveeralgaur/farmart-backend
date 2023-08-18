import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { files } from './upload-file/entities/files.entity';

export const getDatabaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.get<string>('DB_HOSTNAME') || 'localhost',
    port: configService.get<number>('DB_PORT') || 3306,
    username: configService.get<string>('DB_USERNAME') || 'root',
    password: configService.get<string>('DB_PASSWORD') || 'password',
    database: configService.get<string>('DB_NAME') || 'farmart',
    entities: ['dist/**/*.entity{.ts,.js}', files],
    synchronize: true,
  };
};
