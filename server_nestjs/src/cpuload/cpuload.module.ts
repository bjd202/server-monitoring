import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { CpuLoad } from '../models/cpuload.model'
import { CpuLoadController } from './cpuload.controller';
import { CpuLoadService } from './cpuload.service';

@Module({
    imports: [SequelizeModule.forFeature([CpuLoad])],
    providers: [CpuLoadService],
    controllers: [CpuLoadController]
})
export class CpuLoadModule {}
