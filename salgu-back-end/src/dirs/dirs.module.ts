import { Module } from '@nestjs/common';
import { DirsService } from './dirs.service';
import { DirsController } from './dirs.controller';

@Module({
  controllers: [DirsController],
  providers: [DirsService],
})
export class DirsModule {}
