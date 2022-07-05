import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { Memory } from '../models/memory.model'
import { SequelizeModule } from '@nestjs/sequelize';
import { MemoryController } from './memory.controller';

@Module({
  imports: [SequelizeModule.forFeature([Memory])],
  providers: [MemoryService],
  controllers: [MemoryController]
})
export class MemoryModule {}
