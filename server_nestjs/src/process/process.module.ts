import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Process } from 'src/models/process.model';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
  imports: [SequelizeModule.forFeature([Process])],
  providers: [ProcessService],
  controllers: [ProcessController]
})
export class ProcessModule {}
