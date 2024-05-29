import { Module, forwardRef } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { storageProvider } from 'src/storage/storage.provider';
import { UsageSnapshotsModule } from 'src/usage-snapshots/usage-snapshots.module';
import { UsageSnapshotsService } from 'src/usage-snapshots/usage-snapshots.service';
import { FileActionEntity } from 'src/file-actions/entities/file-action.entity';
import { FileActionsModule } from 'src/file-actions/file-actions.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [FilesController],
  providers: [
    FilesService,
    storageProvider,
    UsageSnapshotsService,
    PermissionsService,
    CaslAbilityFactory,
  ],
  imports: [
    TypeOrmModule.forFeature([FileEntity, FileActionEntity]),
    UsageSnapshotsModule,
    FileActionsModule,
    CaslModule,
    forwardRef(() => PermissionsModule),
  ],
  exports: [
    FilesService,
    storageProvider,
    UsageSnapshotsService,
    TypeOrmModule,
    CaslAbilityFactory,
  ],
})
export class FilesModule {}
