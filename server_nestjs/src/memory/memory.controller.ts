import { Controller, Get, Post } from '@nestjs/common';
import { Memory } from 'src/models/memory.model';
import { MemoryService } from './memory.service';

@Controller('memory')
export class MemoryController {

    constructor(private readonly memoryService: MemoryService){}

    @Get('findMemoryUsedTop5')
    async findMemoryUsedTop5(): Promise<Memory[]> {
        return await this.memoryService.findMemoryTop5()
    }

    @Post('findAvgMemory')
    async findAvgMemory(): Promise<Memory[]>{
        return await this.memoryService.findAvgMemory()
    }
}
