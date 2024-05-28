import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { storageProvider } from 'src/storage/storage.provider';
import { UsageSnapshotsModule } from 'src/usage-snapshots/usage-snapshots.module';
import { UsageSnapshotsService } from 'src/usage-snapshots/usage-snapshots.service';
import { FileActionEntity } from 'src/file-actions/entities/file-action.entity';
import { FileActionsModule } from 'src/file-actions/file-actions.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, storageProvider, UsageSnapshotsService],
  imports: [
    TypeOrmModule.forFeature([FileEntity, FileActionEntity]),
    UsageSnapshotsModule,
    FileActionsModule,
  ],
  exports: [
    FilesService,
    storageProvider,
    UsageSnapshotsService,
    TypeOrmModule,
  ],
})
export class FilesModule {}
