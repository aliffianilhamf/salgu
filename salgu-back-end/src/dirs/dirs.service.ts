import { Injectable } from '@nestjs/common';
import { CreateDirDto } from './dto/create-dir.dto';
import { UpdateDirDto } from './dto/update-dir.dto';

@Injectable()
export class DirsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createDirDto: CreateDirDto) {
    return 'This action adds a new dir';
  }

  findAll() {
    return `This action returns all dirs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dir`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateDirDto: UpdateDirDto) {
    return `This action updates a #${id} dir`;
  }

  remove(id: number) {
    return `This action removes a #${id} dir`;
  }
}
