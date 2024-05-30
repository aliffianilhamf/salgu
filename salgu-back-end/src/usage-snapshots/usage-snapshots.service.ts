import { Injectable } from '@nestjs/common';
import { CreateUsageSnapshotDto } from './dto/create-usage-snapshot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsageSnapshotEntity } from './entities/usage-snapshot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsageSnapshotsService {
  constructor(
    @InjectRepository(UsageSnapshotEntity)
    private readonly snapRepo: Repository<UsageSnapshotEntity>,
  ) {}
  create(createUsageSnapshotDto: CreateUsageSnapshotDto) {
    return this.snapRepo.save(createUsageSnapshotDto);
  }

  findAll() {
    return this.snapRepo.find();
  }

  findOne(id: number) {
    return this.snapRepo.findOne({ where: { id } });
  }

  calculateUsage(userId: number) {
    return this.snapRepo.sum('sizeDelta', { userId });
  }
}
