import { Test, TestingModule } from '@nestjs/testing';
import { DirsController } from './dirs.controller';
import { DirsService } from './dirs.service';

describe('DirsController', () => {
  let controller: DirsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirsController],
      providers: [DirsService],
    }).compile();

    controller = module.get<DirsController>(DirsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
