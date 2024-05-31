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
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(
    subject: Subject,
    subjectId: number,
    createPermissionDto: CreatePermissionDto,
  ) {
    let permission = new PermissionEntity();

    const userIds = permission.userIds || [];
    if (createPermissionDto.userEmails) {
      const ids = await this.findUserIdsByEmails(
        createPermissionDto.userEmails,
      );
      userIds.push(...ids);
    }
    permission = Object.assign(permission, createPermissionDto);
    // @ts-expect-error userEmails is not in the PermissionEntity type
    delete permission.userEmails;
    permission.userIds = userIds;

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

    const originalPermissionDtos: GetPermissionDto[] = await Promise.all(
      originalPermissions.map(async (permission) => ({
        ...permission,
        isInherited: false,
        userEmails: await this.findUserEmailsByIds(permission.userIds),
      })),
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
            userEmails: await this.findUserEmailsByIds(p.userIds),
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

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    let permission = new PermissionEntity();

    const userIds = permission.userIds || [];
    if (updatePermissionDto.userEmails) {
      const ids = await this.findUserIdsByEmails(
        updatePermissionDto.userEmails,
      );
      userIds.push(...ids);
    }
    permission = Object.assign(permission, updatePermissionDto);
    // @ts-expect-error userEmails is not in the PermissionEntity type
    delete permission.userEmails;
    permission.userIds = userIds;

    return this.permissionRepo.update({ id }, permission);
  }

  remove(id: number) {
    return this.permissionRepo.delete({ id });
  }

  private async findUserEmailsByIds(ids: number[]) {
    return this.userRepo
      .find({
        select: { email: true },
        where: ids.map((id) => ({ id })),
      })
      .then((users) => users.map((user) => user.email));
  }

  private async findUserIdsByEmails(emails: string[]) {
    return this.userRepo
      .find({
        select: { id: true },
        where: emails.map((email) => ({ email })),
      })
      .then((users) => users.map((user) => user.id));
  }
}
