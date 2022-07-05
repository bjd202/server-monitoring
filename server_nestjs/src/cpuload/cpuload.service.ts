import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, {QueryTypes} from 'sequelize';
import { CpuLoad } from '../models/cpuload.model';
import * as moment from 'moment'
import { Op } from 'sequelize';

@Injectable()
export class CpuLoadService {
    constructor(
        @InjectModel(CpuLoad)
        private cpuLoadModel: typeof CpuLoad,
    ){}

    findAll(): Promise<CpuLoad[]>{
        return this.cpuLoadModel.findAll()
    }

    findCpuLoadTop5(): Promise<CpuLoad[]>{

        return this.cpuLoadModel.findAll({
            attributes: [
                [sequelize.fn('round', sequelize.fn('max', sequelize.col('currentLoad'))), 'data'],
                'hostname'
            ],
            raw: true,
            where: {
                createdAt: {
                    [Op.between]: [
                        moment().subtract(10, 'seconds').toDate(),
                        moment().toDate()
                    ]
                }
            },
            group: ['hostname'],
            order: [
                ['currentLoad', 'DESC']
            ],
            limit: 5
        })
    }

    findLastCpu(): Promise<CpuLoad[]>{
        return this.cpuLoadModel.sequelize.query(
            `SELECT
                A.hostname,
                AVG(A.currentLoad) as avgCpu
            FROM (
                SELECT
                    *
                FROM cpu_load
                WHERE createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 9 SECOND) AND NOW()
                GROUP BY hostname
            ) A
            `,
            {type: QueryTypes.SELECT}
        )
    }

}
