import { Injectable } from '@nestjs/common';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DirEntity } from './entities/dir.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirsService {
  constructor(
    @InjectRepository(DirEntity)
    private readonly dirRepo: Repository<DirEntity>,
  ) {}

  create(createDirDto: CreateDirDto) {
    return this.dirRepo.save(createDirDto);
  }

  findAll() {
    return this.dirRepo.find();
  }

  findOne(id: number) {
    return this.dirRepo.findOne({ where: { id } });
  }

  update(id: number, updateDirDto: UpdateDirDto) {
    return this.dirRepo.update({ id }, updateDirDto);
  }

  remove(id: number) {
    return this.dirRepo.delete({ id });
  }
}
