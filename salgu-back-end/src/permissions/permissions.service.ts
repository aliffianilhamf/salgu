import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { Subject } from './types';
import { GetPermissionDto } from './dto/get-permission.dto';
import { DirEntity } from 'src/dirs/entities/dir.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
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
   *
   * The `findOne-` functions are temporarily used
   * to avoid circular dependencies.
   */
  async findAll(
    subject: Subject,
    subjectId: number,
    // TODO: Use a better way to get the dir and file entities.
    findOneDir: (id: number) => Promise<DirEntity | null>,
    findOneDirByPath: (
      path: string,
      ownerId: number,
    ) => Promise<DirEntity | null>,
    findOneFile?: ((id: number) => Promise<FileEntity | null>) | null,
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
      const dir = await findOneDir(subjectId);
      dirPath = dir!.path;
      ownerId = dir!.ownerId;
    } else {
      if (!findOneFile) throw new Error('findOneFile is required for files');
      const file = await findOneFile(subjectId);
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
      pathsToSearch.map((path) => findOneDirByPath(path, ownerId)),
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
