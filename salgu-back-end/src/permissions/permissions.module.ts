import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { DirsModule } from 'src/dirs/dirs.module';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, UserEntity]),
    forwardRef(() => FilesModule),
    forwardRef(() => DirsModule),
  ],
  exports: [PermissionsService, TypeOrmModule],
})
export class PermissionsModule {}
