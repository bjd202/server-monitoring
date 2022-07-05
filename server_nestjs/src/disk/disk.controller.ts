import { Controller, Get, Post } from '@nestjs/common';
import { Disk } from 'src/models/disk.model';
import { DiskService } from './disk.service';

@Controller('disk')
export class DiskController {

    constructor(private readonly diskService: DiskService){}

    @Get('findDiskUseTop5')
    async findDiskUseTop5(): Promise<Disk[]>{
        return await this.diskService.findDiskUseTop5()
    }

    @Post('findAvgDisk')
    async findAvgDisk(): Promise<Disk[]>{
        return await this.diskService.findAvgDisk()
    }
}
