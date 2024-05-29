import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { DirsService } from 'src/dirs/dirs.service';
import { FilesModule } from 'src/files/files.module';
import { DirsModule } from 'src/dirs/dirs.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, FilesService, DirsService],
  imports: [
    TypeOrmModule.forFeature([PermissionEntity]),
    forwardRef(() => FilesModule),
    DirsModule,
  ],
  exports: [PermissionsService, TypeOrmModule, DirsModule],
})
export class PermissionsModule {}
