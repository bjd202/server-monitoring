import { Controller, Get, Post } from '@nestjs/common';
import { Cpu } from 'src/models/cpu.model';
import { CpuService } from './cpu.service';

@Controller('cpu')
export class CpuController {

    constructor(private readonly cpuService: CpuService){}

    @Get('top5')
    getTop5(): string{
        return 'cpu top 5';
    }

    @Get('findAll')
    async findAll(): Promise<Cpu[]>{
        return await this.cpuService.findAll();
    }

    @Post('findTotalCores')
    async findTotalCores(): Promise<Cpu[]>{
        return this.cpuService.findTotalCores()
    }
}
