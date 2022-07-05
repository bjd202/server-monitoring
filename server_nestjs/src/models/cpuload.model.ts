import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table,  } from 'sequelize-typescript'
import { Server } from './server.model'

@Table({
    tableName: 'cpu_load',
    freezeTableName: true,
})
export class CpuLoad extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => Server)
    @Column
    hostname: string

    @Column
    avgLoad: number

    @Column
    currentLoad: number

    @Column
    currentLoadUser: number

    @Column
    currentLoadSystem: number

    @Column
    currentLoadNice: number

    @Column
    currentLoadIdle: number

    @Column
    currentLoadIrq: number

    @Column
    rawCurrentLoad: number

    @Column
    rawCurrentLoadUser: number

    @Column
    rawCurrentLoadSystem: number

    @Column
    rawCurrentLoadNice: number

    @Column
    rawCurrentLoadIdle: number

    @Column
    rawCurrentLoadIrq: number

    @Column
    createdAt: Date

    @Column
    updatedAt: Date

    @BelongsTo(() => Server)
    server: Server
}