import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { DirsModule } from 'src/dirs/dirs.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    TypeOrmModule.forFeature([PermissionEntity]),
    forwardRef(() => FilesModule),
    forwardRef(() => DirsModule),
  ],
  exports: [PermissionsService, TypeOrmModule],
})
export class PermissionsModule {}
