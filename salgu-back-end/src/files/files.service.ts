import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import AppError from 'src/errors/app-error';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
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

    return this.fileRepo.save({ ...createFileDto, size: 0, ownerId: userId });
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

  update(id: number, updateFileDto: UpdateFileDto) {
    return this.fileRepo.update({ id }, updateFileDto);
  }

  remove(id: number) {
    return this.fileRepo.delete({ id });
  }
}
