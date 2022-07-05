import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize'
import { CpuModule } from './cpu/cpu.module';
import { CpuLoadModule } from './cpuload/cpuload.module';
import { MemoryModule } from './memory/memory.module';
import { DiskModule } from './disk/disk.module';
import { ProcessModule } from './process/process.module';
import { ServerController } from './server/server.controller';
import { ServerModule } from './server/server.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'collect',
      autoLoadModels: true,
      timezone: 'Asia/Seoul'
      //models: [Cpu, CpuLoad]
    }),
    CpuModule,
    CpuLoadModule,
    MemoryModule,
    DiskModule,
    ProcessModule,
    ServerModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
