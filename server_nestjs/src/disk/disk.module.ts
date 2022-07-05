import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Disk } from 'src/models/disk.model';
import { DiskController } from './disk.controller';
import { DiskService } from './disk.service';

@Module({
  imports: [SequelizeModule.forFeature([Disk])],
  providers: [DiskService],
  controllers: [DiskController]
})
export class DiskModule {}
