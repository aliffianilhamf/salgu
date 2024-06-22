import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { IsNull, Not, Repository } from 'typeorm';
import AppError from 'src/errors/app-error';
import { StorageService } from 'src/storage/storage.service';
import { UsageSnapshotsService } from 'src/usage-snapshots/usage-snapshots.service';
import { FileActionEntity } from 'src/files/file-actions/entities/file-action.entity';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DirsService } from 'src/dirs/dirs.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly storageService: StorageService,
    private readonly usageSnapshotsService: UsageSnapshotsService,
    @InjectRepository(FileActionEntity)
    private readonly fileActionRepo: Repository<FileActionEntity>,
    private readonly permissionsService: PermissionsService,
    private readonly dirsService: DirsService,
  ) {}

  async create(createFileDto: CreateFileDto, userId: number) {
    const existingFile = await this.fileRepo.findOne({
      where: { name: createFileDto.name, dirId: createFileDto.dirId },
      relations: ['dir'],
    });

    if (existingFile) {
      throw new AppError(
        'File already exists in the directory',
        { fileName: createFileDto.name, dirPath: existingFile.dir.path },
        'FILE_UPLOAD_DUPLICATE',
      );
    }

    // TODO: Wrap these in a transaction

    // TODO: Synchronize the time of when this event happens.
    // Currently, the `created_at`, and `executed_at` fields may not be in sync.

    const file = await this.fileRepo.save({
      ...createFileDto,
      size: 0,
      ownerId: userId,
    });

    await this.usageSnapshotsService.create({
      fileId: file.id,
      sizeDelta: 0,
      action: 'upload',
      userId,
    });

    await this.fileActionRepo.save({
      actorId: userId,
      fileId: file.id,
      type: 'upload',
    });

    return file;
  }

  findDeleted(ownerId: number) {
    return this.fileRepo.find({
      withDeleted: true,
      where: { ownerId, deletedAt: Not(IsNull()) },
    });
  }

  findAll(userId: number) {
    return this.fileRepo.find({ where: { ownerId: userId } });
  }

  findOne(id: number) {
    return this.fileRepo.findOne({
      where: { id },
      relations: {
        dir: true,
      },
    });
  }

  async findOneWithPermissions(id: number) {
    const file = await this.fileRepo.findOneOrFail({ where: { id } });
    const permissions = await this.permissionsService.findAll(
      'file',
      +id,
      this.dirsService.findOne.bind(this.dirsService),
      this.dirsService.findOneByPath.bind(this.dirsService),
      this.findOne.bind(this),
      true,
    );

    file.permissions = permissions;
    return file;
  }

  getFile(id: number) {
    return this.storageService.getFile(id.toString());
  }

  async update(id: number, updateFileDto: UpdateFileDto, actorId?: number) {
    if (!actorId)
      actorId = (await this.fileRepo.findOneOrFail({ where: { id } })).ownerId;

    // TODO: Wrap these in a transaction
    this.fileActionRepo.save({
      actorId,
      fileId: id,
      type: 'modify',
    });

    return this.fileRepo.update({ id }, updateFileDto);
  }

  async saveFileData(id: number, file: Express.Multer.File, actorId?: number) {
    const fileEntity = await this.fileRepo.findOneOrFail({ where: { id } });
    const prevSize = fileEntity.size;
    const newSize = file.size;
    const sizeDelta = newSize - prevSize;

    // TODO: Make these atomic.
    await this.fileActionRepo.save({
      actorId: actorId || fileEntity.ownerId,
      fileId: id,
      type: 'modify',
    });
    await this.fileRepo.update({ id }, { size: newSize });
    await this.usageSnapshotsService.create({
      fileId: id,
      sizeDelta,
      action: 'modify',
      userId: fileEntity.ownerId,
    });

    // TODO: Handle possible mismatch that could happen when an exception
    // occured after the database was updated but before the file was saved.
    this.storageService.saveFile(file, id.toString(), { overwrite: true });
  }

  async remove(id: number, actorId?: number) {
    const file = await this.fileRepo.findOneOrFail({
      where: { id },
      select: {
        ownerId: true,
        size: true,
      },
    });

    // TODO: Make these atomic
    await this.fileActionRepo.save({
      actorId: actorId || file.ownerId,
      fileId: id,
      type: 'delete',
    });
    await this.usageSnapshotsService.create({
      fileId: id,
      sizeDelta: -file.size,
      action: 'delete',
      userId: file.ownerId,
    });
    await this.fileRepo.update({ id }, { size: 0 });
    return this.fileRepo.softDelete({ id });
  }

  getFileHistory(fileId: number) {
    return this.fileActionRepo.find({
      where: { fileId },
      relations: {
        // TODO: Make this false and use a separate query to get the actor from the front end.
        actor: true,
      },
    });
  }
}
