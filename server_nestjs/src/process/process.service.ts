import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Process } from 'src/models/process.model';

@Injectable()
export class ProcessService {

    constructor(
        @InjectModel(Process)
        private processModel: typeof Process,
    ){}

    findProcessCpuTop5(): Promise<Process[]>{
        return this.processModel.findAll({
            attributes:[
                [sequelize.fn('max', sequelize.col('cpu')), 'cpu'],
                [sequelize.fn('max', sequelize.col('cpuu')), 'cpuu'],
                [sequelize.fn('max', sequelize.col('cpus')), 'cpus'],
                'name',
                'hostname'
            ],
            raw: true,
            where: {
                createdAt: {
                    [Op.between]: [
                        moment().subtract(5, 'minutes').toDate(),
                        moment().toDate()
                    ]
                }
            },
            group: ['name', 'hostname'],
            order: [
                [sequelize.fn('max', sequelize.col('cpu')), 'DESC']
            ],
            limit: 5
        })
    }

    findProcessMemoryTop5(): Promise<Process[]>{
        return this.processModel.findAll({
            attributes:[
                [sequelize.fn('max', sequelize.col('mem')), 'mem'],
                'name',
                'hostname'
            ],
            raw: true,
            where: {
                createdAt: {
                    [Op.between]: [
                        moment().subtract(5, 'minutes').toDate(),
                        moment().toDate()
                    ]
                }
            },
            group: ['name', 'hostname'],
            order: [
                [sequelize.fn('max', sequelize.col('mem')), 'DESC']
            ],
            limit: 5
        })
    }
}
