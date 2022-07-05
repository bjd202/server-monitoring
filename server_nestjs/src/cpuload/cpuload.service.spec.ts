import { Test, TestingModule } from '@nestjs/testing';
import { CpuLoadService } from './cpuload.service';

describe('CpuLoadService', () => {
  let service: CpuLoadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpuLoadService],
    }).compile();

    service = module.get<CpuLoadService>(CpuLoadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
