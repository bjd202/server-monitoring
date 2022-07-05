import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
    tableName: 'process',
    freezeTableName: true
})
export class Process extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    hostname: string

    @Column
    pid: number

    @Column
    parentPid: number

    @Column
    name: string

    @Column
    cpu: number

    @Column
    cpuu: number

    @Column
    cpus: number

    @Column
    mem: number

    @Column
    priority: number

    @Column
    memVsz: number

    @Column
    memRss: number

    @Column
    nice: number

    @Column
    started: string

    @Column
    state: string

    @Column
    tty: string

    @Column
    user: string

    @Column
    command: string

    @Column
    path: string

    @Column
    params: string

    @Column
    createdAt: Date

    @Column
    updatedAt: Date
}