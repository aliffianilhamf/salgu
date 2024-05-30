import { Injectable } from '@nestjs/common';
import { CreateFileActionDto } from './dto/create-file-action.dto';
import { UpdateFileActionDto } from './dto/update-file-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileActionEntity } from './entities/file-action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileActionsService {
  constructor(
    @InjectRepository(FileActionEntity)
    private readonly fileActionRepo: Repository<FileActionEntity>,
  ) {}

  create(createFileActionDto: CreateFileActionDto) {
    return this.fileActionRepo.save(createFileActionDto);
  }
  findAll() {
    return this.fileActionRepo.find();
  }

  findOne(id: number) {
    return this.fileActionRepo.findOne({ where: { id } });
  }

  update(id: number, updateFileActionDto: UpdateFileActionDto) {
    return this.fileActionRepo.update({ id }, updateFileActionDto);
  }

  remove(id: number) {
    return this.fileActionRepo.delete({ id });
  }
}
