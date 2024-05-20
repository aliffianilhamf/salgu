import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepo.save(createPermissionDto);
  }

  findAll() {
    return this.permissionRepo.find();
  }

  findOne(id: number) {
    return this.permissionRepo.findOne({ where: { id } });
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionRepo.update({ id }, updatePermissionDto);
  }

  remove(id: number) {
    return this.permissionRepo.delete({ id });
  }
}
