import { Controller, Get, Post } from '@nestjs/common';
import { CpuLoad } from 'src/models/cpuload.model';
import { CpuLoadService } from './cpuload.service';

@Controller('cpuload')
export class CpuLoadController {

    constructor(private readonly cpuLoadService: CpuLoadService){}

    @Get('findAll')
   async findAll(): Promise<CpuLoad[]> {
       return await this.cpuLoadService.findAll()
   }

    @Get('findCpuLoadTop5')
    async findCpuLoadTop5(): Promise<CpuLoad[]>{
        return await this.cpuLoadService.findCpuLoadTop5();
    }

    @Post('findAvgCpu')
    async findAvgCpu(): Promise<CpuLoad[]>{
        return await this.cpuLoadService.findLastCpu();
    }
}
