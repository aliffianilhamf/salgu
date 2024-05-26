import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import AppError from 'src/errors/app-error';
import { StorageService } from 'src/storage/storage.service';
import { UsageSnapshotsService } from 'src/usage-snapshots/usage-snapshots.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly storageService: StorageService,
    private readonly usageSnapshotsService: UsageSnapshotsService,
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

    return file;
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

  getFile(id: number) {
    return this.storageService.getFile(id.toString());
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return this.fileRepo.update({ id }, updateFileDto);
  }

  async saveFileData(id: number, file: Express.Multer.File) {
    const fileEntity = await this.fileRepo.findOneOrFail({ where: { id } });
    const prevSize = fileEntity.size;
    const newSize = file.size;
    const sizeDelta = newSize - prevSize;

    // TODO: Make these atomic.
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

  async remove(id: number) {
    const file = await this.fileRepo.findOneOrFail({
      where: { id },
      select: {
        ownerId: true,
        size: true,
      },
    });

    // TODO: Make these atomic
    await this.usageSnapshotsService.create({
      fileId: id,
      sizeDelta: -file.size,
      action: 'delete',
      userId: file.ownerId,
    });
    return this.fileRepo.delete({ id });
  }
}
