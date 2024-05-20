import { Test, TestingModule } from '@nestjs/testing';
import { UsageSnapshotsService } from './usage-snapshots.service';

describe('UsageSnapshotsService', () => {
  let service: UsageSnapshotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageSnapshotsService],
    }).compile();

    service = module.get<UsageSnapshotsService>(UsageSnapshotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
