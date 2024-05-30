import { Module, forwardRef } from '@nestjs/common';
import { DirsService } from './dirs.service';
import { DirsController } from './dirs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirEntity } from './entities/dir.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  controllers: [DirsController],
  providers: [DirsService, PermissionsService],
  imports: [
    TypeOrmModule.forFeature([DirEntity]),
    forwardRef(() => PermissionsModule),
  ],
  exports: [DirsService, TypeOrmModule],
})
export class DirsModule {}
