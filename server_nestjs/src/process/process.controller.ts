import { Controller, Get } from '@nestjs/common';
import { Process } from 'src/models/process.model';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
    constructor(private readonly processService: ProcessService){}

    @Get('/findProcessCpuTop5')
    async findProcessCpuTop5(): Promise<Process[]>{
        return await this.processService.findProcessCpuTop5()
    }

    @Get('/findProcessMemoryTop5')
   async findProcessMemoryTop5(): Promise<Process[]>{
       return await this.processService.findProcessMemoryTop5()
   }
}
