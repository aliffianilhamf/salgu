import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfig from './config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigFactory } from './utils/typeorm-config-factory';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormConfigFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
