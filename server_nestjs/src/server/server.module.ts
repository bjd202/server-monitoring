import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Server } from 'src/models/server.model';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
  imports: [SequelizeModule.forFeature([Server])],
  providers: [ServerService],
  controllers: [ServerController]
})
export class ServerModule {}
