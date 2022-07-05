import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import sequelize, { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Memory } from 'src/models/memory.model';

@Injectable()
export class MemoryService {
    constructor(
        @InjectModel(Memory)
        private memoryModel: typeof Memory,
    ){}

    findMemoryTop5(): Promise<Memory[]>{

        return this.memoryModel.findAll({
            attributes: [
                [sequelize.fn('round', sequelize.literal('(used/total)*100')), 'data'],
                'hostname'
            ],
            raw: true,
            where: {
                createdAt: {
                    [Op.between]: [
                        moment().subtract(5, 'seconds').toDate(),
                        moment().toDate()
                    ]
                }
            },
            group: ['hostname'],
            order: [
                ['used', 'DESC']
            ],
            limit: 5
        })
    }

    findAvgMemory(): Promise<Memory[]>{
        return this.memoryModel.sequelize.query(
            `SELECT
                AVG((A.used/A.total) * 100) AS avgMem
            FROM (
                SELECT
                    *
                FROM memory
                WHERE createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 9 SECOND) AND NOW()
                GROUP BY hostname
            ) A`,
            {type: QueryTypes.SELECT}
        )
    }
}
