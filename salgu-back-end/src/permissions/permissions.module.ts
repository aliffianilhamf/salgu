import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
})
export class PermissionsModule {}
