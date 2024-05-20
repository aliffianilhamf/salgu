import { Module } from '@nestjs/common';
import { DirsService } from './dirs.service';
import { DirsController } from './dirs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirEntity } from './entities/dir.entity';

@Module({
  controllers: [DirsController],
  providers: [DirsService],
  imports: [TypeOrmModule.forFeature([DirEntity])],
})
export class DirsModule {}
