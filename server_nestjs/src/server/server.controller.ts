import { Body, Controller, Patch, Post } from '@nestjs/common';
import { Server } from 'src/models/server.model';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {

    constructor(private readonly serverService: ServerService){}

    @Post('/findAll')
   async findAll(): Promise<Server[]> {
       return this.serverService.findAll()
   }

    @Post('/add')
    async add(@Body() server: Server): Promise<string>{
        return this.serverService.add(server)
    }

    @Patch('/edit')
    async edit(@Body() server: Server): Promise<string> {
        return this.serverService.edit(server)
    }

    @Post('/serverCount')
    async serverCount(): Promise<Server>{
        return this.serverService.serverCount()
    }

    @Post('/osCount')
    async osCount(): Promise<Server>{
        return this.serverService.osCount()
    }
}
