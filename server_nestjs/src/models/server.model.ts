import { hostname } from 'os'
import { AutoIncrement, BelongsTo, Column, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { CpuLoad } from './cpuload.model'
import { Disk } from './disk.model'
import { Memory } from './memory.model'

@Table({
    tableName: 'servers',
    freezeTableName: true
})
export class Server extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    name: string

    @Column
    hostname: string

    @Column
    os: string

    @Column
    ip: string

    @Column
    use_yn: string

    @Column
    createdAt: Date

    @Column
    updatedAt: Date

    @HasMany(() => CpuLoad)
    cpuLoad: CpuLoad[]

    @HasMany(() => Disk)
    disk: Disk[]

    @HasMany(() => Memory)
    memory: Memory[]
}