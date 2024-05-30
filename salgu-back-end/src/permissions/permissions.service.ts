import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Subject } from './types';
import { GetPermissionDto } from './dto/get-permission.dto';
import { DirsService } from 'src/dirs/dirs.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    @Inject(forwardRef(() => DirsService))
    private readonly dirsService: DirsService,
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
  ) {}
  create(
    subject: Subject,
    subjectId: number,
    createPermissionDto: CreatePermissionDto,
  ) {
    let permission = new PermissionEntity();
    permission = Object.assign(permission, createPermissionDto);

    if (subject === 'dir') permission.dirId = subjectId;
    else permission.fileId = subjectId;

    return this.permissionRepo.save(permission);
  }

  /**
   * Find all permissions bound to a subject.
   */
  async findAll(
    subject: Subject,
    subjectId: number,
    includeInherited = false,
  ): Promise<GetPermissionDto[]> {
    /**
     * Permissions that are bound directly to the subject.
     */
    let originalPermissions: PermissionEntity[] = [];

    if (subject === 'dir') {
      originalPermissions = await this.permissionRepo.find({
        where: { dirId: subjectId },
      });
    } else
      originalPermissions = await this.permissionRepo.find({
        where: { fileId: subjectId },
      });

    const originalPermissionDtos: GetPermissionDto[] = originalPermissions.map(
      (permission) => ({
        ...permission,
        isInherited: false,
      }),
    );

    if (!includeInherited) return originalPermissionDtos;

    let dirPath: string;
    let ownerId: number;

    if (subject === 'dir') {
      const dir = await this.dirsService.findOne(subjectId);
      dirPath = dir!.path;
      ownerId = dir!.ownerId;
    } else {
      const file = await this.filesService.findOne(subjectId);
      dirPath = file!.dir.path;
      ownerId = file!.ownerId;
    }

    /**
     * Paths to search for inherited permissions.
     */
    const pathsToSearch: string[] = [];
    let head = '';

    for (const component of dirPath.split('/')) {
      if (!component) continue;
      head += `/${component}`;
      pathsToSearch.push(head);
    }

    // Remove the last path if the subject is a dir, otherwise
    // there would be duplicate permissions.
    if (subject === 'dir') pathsToSearch.pop();

    const dirs = await Promise.all(
      pathsToSearch.map((path) =>
        this.dirsService.findOneByPath(path, ownerId),
      ),
    );

    const inheritedPermissionDtos: GetPermissionDto[] = [];

    await Promise.all(
      dirs.map(async (dir) => {
        if (!dir) return;

        const ps = await this.permissionRepo.find({ where: { dirId: dir.id } });

        for (const p of ps) {
          inheritedPermissionDtos.push({
            ...p,
            isInherited: true,
            sourceDir: dir,
          });
        }
      }),
    );

    return [...originalPermissionDtos, ...inheritedPermissionDtos];
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
