import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { Cpu } from '../models/cpu.model'
import { CpuController } from './cpu.controller'
import { CpuService } from './cpu.service'

@Module({
    imports: [SequelizeModule.forFeature([Cpu])],
    providers: [CpuService],
    controllers: [CpuController]
})
export class CpuModule {}
