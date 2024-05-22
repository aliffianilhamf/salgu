import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfig from './config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigFactory } from './utils/typeorm-config-factory';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { DirsModule } from './dirs/dirs.module';
import { UsageSnapshotsModule } from './usage-snapshots/usage-snapshots.module';
import { PermissionsModule } from './permissions/permissions.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormConfigFactory,
      inject: [ConfigService],
    }),
    FilesModule,
    UsersModule,
    DirsModule,
    UsageSnapshotsModule,
    PermissionsModule,
    InvoicesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
