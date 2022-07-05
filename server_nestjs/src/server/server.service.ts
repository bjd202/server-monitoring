import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import sequelize, { QueryTypes, where } from 'sequelize';
import { Op } from 'sequelize';
import { CpuLoad } from 'src/models/cpuload.model';
import { Disk } from 'src/models/disk.model';
import { Memory } from 'src/models/memory.model';
import { Server } from 'src/models/server.model';

@Injectable()
export class ServerService {

    constructor(
        @InjectModel(Server)
        private serverModel: typeof Server,
    ){}

    findAll(): Promise<Server[]>{
        return this.serverModel.sequelize.query(
            `SELECT
                A.id,
                A.name,
                A.hostname,
                A.os,
                A.ip,
                A.createdAt,
                A.updatedAt,
                A.use_yn,
                B.currentLoad,
                C.disk_used,
                D.mem_used
            FROM servers AS A
            JOIN (
                SELECT
                    *
                FROM cpu_load
                ORDER BY createdAt DESC
                LIMIT 1
            ) AS B
            ON A.hostname = B.hostname
            JOIN (
                SELECT
                    disk.use AS disk_used,
                    disk.*
                FROM disk
                ORDER BY createdAt DESC
                LIMIT 1
            ) AS C
            ON A.hostname = C.hostname
            JOIN (
                SELECT
                        (used/total) * 100 AS mem_used,
                    memory.*
                FROM memory
                ORDER BY createdAt DESC
                LIMIT 1
            ) AS D
            ON A.hostname = D.hostname`, 
            {type: QueryTypes.SELECT}
        )
    }

    findOne(server: Server): Promise<Server>{
        return this.serverModel.findOne({
            where: {
                hostname: server.hostname
            }
        })
    }

    async add(server: Server): Promise<string>{
        let result: string

        await this.findOne(server)
        .then(value => {
            if(value !== null){
                result = 'duplicate'
            }else{
                this.serverModel.create({...server})
                result = 'success'
            }
        })

        console.log(result)
        return result
    }

    async edit(server: Server): Promise<string>{
        let result: string

        await this.serverModel.update({
            ...server
        }, {
            where: {id: server.id}
        })
        .then(value => {
            console.log(value)
            result = 'success'
        })
        .catch(err => {
            console.error(err)
            result = 'fail'
        })

        return result
    }

    serverCount(): Promise<Server>{
        return this.serverModel.findOne({
            attributes: [
                [sequelize.literal(`(select count('id') from servers where use_yn = 'Y')`), 'use_y'],
                [sequelize.literal(`(select count('id') from servers where use_yn = 'N')`), 'use_n'],
            ],
            limit: 1
        })
    }

    osCount(): Promise<Server>{
        return this.serverModel.findOne({
            attributes: [
                [sequelize.literal(`(select count('id') from servers where os = 'Windows')`), 'windows'],
                [sequelize.literal(`(select count('id') from servers where os = 'Linux')`), 'linux'],
                [sequelize.literal(`(select count('id') from servers where os = 'Unix')`), 'unix'],
                [sequelize.literal(`(select count('id') from servers where os = 'others')`), 'others'],
            ],
            limit: 1
        })
    }
}
