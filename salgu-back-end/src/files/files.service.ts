import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  create(createFileDto: CreateFileDto) {
    return this.fileRepo.save(createFileDto);
  }

  findAll() {
    return this.fileRepo.find();
  }

  findOne(id: number) {
    return this.fileRepo.findOne({ where: { id } });
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return this.fileRepo.update({ id }, updateFileDto);
  }

  remove(id: number) {
    return this.fileRepo.delete({ id });
  }
}
