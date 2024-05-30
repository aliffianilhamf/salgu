import { Module } from '@nestjs/common';
import { FileActionsService } from './file-actions.service';
import { FileActionsController } from './file-actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileActionEntity } from './entities/file-action.entity';

@Module({
  controllers: [FileActionsController],
  providers: [FileActionsService],
  imports: [TypeOrmModule.forFeature([FileActionEntity]), FileActionsModule],
  exports: [FileActionsService],
})
export class FileActionsModule {}
