import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { storageProvider } from 'src/storage/storage.provider';
import { UsageSnapshotsModule } from 'src/usage-snapshots/usage-snapshots.module';
import { UsageSnapshotsService } from 'src/usage-snapshots/usage-snapshots.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, storageProvider, UsageSnapshotsService],
  imports: [TypeOrmModule.forFeature([FileEntity]), UsageSnapshotsModule],
})
export class FilesModule {}
