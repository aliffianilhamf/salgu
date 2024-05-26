import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import AppError from 'src/errors/app-error';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createFileDto: CreateFileDto,
    userId: number,
    file?: Express.Multer.File,
  ) {
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

    const size = file ? file.size : 0;
    if (file) {
      this.storageService.saveFile(file, createFileDto.name);
    }

    try {
      return this.fileRepo.save({ ...createFileDto, size, ownerId: userId });
    } catch (error) {
      if (file) {
        this.storageService.deleteFile(createFileDto.name);
      }
      throw error;
    }
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
    const newSize = file.size;

    await this.fileRepo.update({ id }, { size: newSize });

    // TODO: Handle possible mismatch that could happen when an exception
    // occured after the database was updated but before the file was saved.
    this.storageService.saveFile(file, id.toString(), { overwrite: true });
  }

  remove(id: number) {
    return this.fileRepo.delete({ id });
  }
}
