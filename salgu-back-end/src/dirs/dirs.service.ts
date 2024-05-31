import * as path from 'path';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DirEntity } from './entities/dir.entity';
import { Like, Repository } from 'typeorm';
import { DRIVE_CONSTANTS } from 'src/config/constants';
import AppError from 'src/errors/app-error';
import { getParentPath, stripTrailingSlashes } from 'src/utils/path';
import { PermissionsService } from 'src/permissions/permissions.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class DirsService {
  constructor(
    @InjectRepository(DirEntity)
    private readonly dirRepo: Repository<DirEntity>,
    private readonly permissionsService: PermissionsService,
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
  ) {}

  async create(createDirDto: CreateDirDto, ownerId: number) {
    let parentId: number | undefined;
    let parentPath = getParentPath(createDirDto.path);
    parentPath = stripTrailingSlashes(parentPath);

    const dirPath = stripTrailingSlashes(createDirDto.path);
    const isRoot = dirPath === DRIVE_CONSTANTS.root;

    if (!isRoot) {
      const parentDir = await this.findOneByPath(parentPath, ownerId);

      if (!parentDir) {
        throw new AppError(
          `Parent directory '${parentPath}' does not exist.`,
          {
            expectedParentPath: parentPath,
          },
          'DIR_PARENT_NOT_FOUND',
        );
      }

      parentId = parentDir.id;
    }

    // If already exists, return the existing directory
    const existingDir = await this.findOneByPath(createDirDto.path, ownerId);
    if (existingDir) return existingDir;

    const dirName = path.posix.basename(createDirDto.path);

    return this.dirRepo.save({
      path: dirPath,
      name: dirName,
      parentId: parentId,
      ownerId,
    });
  }

  findAll(ownerId: number) {
    return this.dirRepo.find({ where: { ownerId } });
  }

  findAllByPathPrefix(pathPrefix: string, ownerId: number) {
    const pathSanitized = path.posix.normalize(pathPrefix);
    return this.dirRepo.find({
      where: { path: Like(`${pathSanitized}%`), ownerId },
    });
  }

  findOne(id: number) {
    return this.dirRepo.findOne({
      where: { id },
      relations: {
        parent: true,
        dirChildren: true,
        fileChildren: true,
      },
    });
  }

  async findOneWithPermissions(id: number) {
    const dir = await this.dirRepo.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    });
    const permissions = await this.permissionsService.findAll(
      'dir',
      id,
      this.findOne.bind(this),
      this.findOneByPath.bind(this),
      null,
      true,
    );

    dir.permissions = permissions;
    return dir;
  }

  findOneByPath(path: string, ownerId: number) {
    return this.dirRepo.findOneBy({ path, ownerId });
  }

  async update(id: number, updateDirDto: UpdateDirDto) {
    // TODO: Handle directory move operations.

    const newPath = updateDirDto.path;
    if (!newPath) return;

    await this.dirRepo.manager.transaction(async (manager) => {
      const dir = await manager.findOneOrFail(DirEntity, { where: { id } });

      const oldPath = dir.path;

      const oldPathPrefix = `${oldPath}/`;
      const newPathPrefix = `${newPath}/`;

      // Only allow updating the last part of the path
      if (!newPath.startsWith(getParentPath(oldPath))) {
        throw new AppError(
          'Cannot move a directory to a different directory.',
          {
            oldPath,
            newPath,
          },
          'DIR_MOVE_NOT_ALLOWED',
        );
      }

      const children = await manager.find(DirEntity, {
        where: { path: Like(`${oldPathPrefix}%`), ownerId: dir.ownerId },
      });

      for (const child of children) {
        child.path = newPathPrefix + child.path.slice(oldPathPrefix.length);
      }

      dir.path = newPath;
      dir.name = path.posix.basename(newPath);

      await manager.save(children);
      await manager.save(dir);
    });
  }

  remove(id: number) {
    // Delete the directory and all its children
    return this.dirRepo.manager.transaction(async (manager) => {
      const dir = await manager.findOneOrFail(DirEntity, {
        where: { id },
        select: { fileChildren: true },
      });

      const pathPrefix = `${dir.path}/`;

      const children = await manager.find(DirEntity, {
        where: { path: Like(`${pathPrefix}%`), ownerId: dir.ownerId },
        relations: { fileChildren: true },
      });
      children.sort((a, b) => a.path.length - b.path.length);

      const fileIds = new Set<number>();

      for (const child of children) {
        for (const file of child.fileChildren || []) {
          fileIds.add(file.id);
        }
      }

      // TODO: Make this apart of transaction
      for (const fileId of fileIds) {
        await this.filesService.remove(fileId);
      }

      await manager.softRemove(children);
      await manager.softRemove(dir);
    });
  }
}
