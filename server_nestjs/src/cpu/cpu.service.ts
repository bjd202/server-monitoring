import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Cpu } from '../models/cpu.model'
import sequelize, { QueryTypes, where } from 'sequelize';

@Injectable()
export class CpuService {
    constructor(
        @InjectModel(Cpu)
        private cpuModel: typeof Cpu,
    ){}

    findAll(): Promise<Cpu[]>{
        return this.cpuModel.findAll()
    }

    findTotalCores(): Promise<Cpu[]>{
        return this.cpuModel.sequelize.query(
            `SELECT
                *,
                SUM(A.cores) AS totalCores
            FROM (
                SELECT 
                    *
                FROM cpu
                where createdAt BETWEEN DATE_SUB(NOW(),INTERVAL 10 SECOND) AND NOW()
                GROUP BY hostname
            ) A`, 
            {type: QueryTypes.SELECT}
        )
    }
}
