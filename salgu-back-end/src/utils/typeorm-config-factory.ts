import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormConfigFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbType = configService.getOrThrow<string>('db.type');
  const pathPrefix = `db.${dbType}`;

  const baseConfig = {
    entities: [__dirname + '../../**/*.entity{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
    logging: configService.getOrThrow<boolean>(`${pathPrefix}.logging`),
    ssl: configService.getOrThrow<boolean>(`${pathPrefix}.ssl`),
  };

  if (dbType === 'mysql') {
    return {
      ...baseConfig,
      type: 'mysql',
      host: configService.getOrThrow<string>(`${pathPrefix}.host`),
      port: configService.getOrThrow<number>(`${pathPrefix}.port`),
      username: configService.getOrThrow<string>(`${pathPrefix}.user`),
      password: configService.getOrThrow<string>(`${pathPrefix}.password`),
      database: configService.getOrThrow<string>(`${pathPrefix}.db`),
      synchronize: configService.getOrThrow<boolean>(
        `${pathPrefix}.synchronize`,
      ),
    };
  }

  throw new Error(`Unsupported database type: '${dbType}'`);
};
