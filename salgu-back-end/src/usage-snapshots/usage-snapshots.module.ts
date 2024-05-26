import { Module } from '@nestjs/common';
import { UsageSnapshotsService } from './usage-snapshots.service';
import { UsageSnapshotsController } from './usage-snapshots.controller';
import { UsageSnapshotEntity } from './entities/usage-snapshot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsageSnapshotsController],
  providers: [UsageSnapshotsService],
  imports: [TypeOrmModule.forFeature([UsageSnapshotEntity])],
  exports: [UsageSnapshotsService, TypeOrmModule],
})
export class UsageSnapshotsModule {}
