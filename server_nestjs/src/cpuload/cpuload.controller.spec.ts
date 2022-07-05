import { Test, TestingModule } from '@nestjs/testing';
import { CpuLoadController } from './cpuload.controller';

describe('CpuloadController', () => {
  let controller: CpuLoadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpuLoadController],
    }).compile();

    controller = module.get<CpuLoadController>(CpuLoadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
