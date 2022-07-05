import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import sequelize, { QueryTypes } from 'sequelize';
import { Op } from 'sequelize';
import { Disk } from 'src/models/disk.model';

@Injectable()
export class DiskService {

    constructor(
        @InjectModel(Disk)
        private diskModel: typeof Disk,
    ){}

    findDiskUseTop5(): Promise<Disk[]>{

        return this.diskModel.findAll({
            attributes: [
                ['use', 'data'],
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
                ['use', 'DESC']
            ],
            limit: 5
        })
    }

    findAvgDisk(): Promise<Disk[]>{
        return this.diskModel.sequelize.query(
            `SELECT
                AVG(A.use) AS avgDisk
            FROM (
                SELECT
                    *
                FROM disk
                WHERE createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 9 SECOND) AND NOW()
                GROUP BY hostname
            ) A
            `,
            {type: QueryTypes.SELECT}
        )
    }
}
