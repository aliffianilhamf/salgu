import { Module, forwardRef } from '@nestjs/common';
import { DirsService } from './dirs.service';
import { DirsController } from './dirs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirEntity } from './entities/dir.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PermissionsService } from 'src/permissions/permissions.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  controllers: [DirsController],
  providers: [DirsService, PermissionsService, CaslAbilityFactory],
  imports: [
    TypeOrmModule.forFeature([DirEntity]),
    forwardRef(() => PermissionsModule),
    CaslModule,
  ],
  exports: [DirsService, TypeOrmModule, PermissionsService],
})
export class DirsModule {}
