import { Injectable } from '@nestjs/common';
import { CreateUsageSnapshotDto } from './dto/create-usage-snapshot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsageSnapshotEntity } from './entities/usage-snapshot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsageSnapshotsService {
  constructor(
    @InjectRepository(UsageSnapshotEntity)
    private readonly fileRepo: Repository<UsageSnapshotEntity>,
  ) {}
  create(createUsageSnapshotDto: CreateUsageSnapshotDto) {
    return this.fileRepo.save(createUsageSnapshotDto);
  }

  findAll() {
    return this.fileRepo.find();
  }

  findOne(id: number) {
    return this.fileRepo.findOne({ where: { id } });
  }
}
