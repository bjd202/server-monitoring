import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Server } from './server.model'

@Table({
    tableName: 'memory',
    freezeTableName: true
})
export class Memory extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => Server)
    @Column
    hostname: string

    @Column
    total: number

    @Column
    free: number

    @Column
    used: number

    @Column
    active: number

    @Column
    available: number

    @Column
    swaptotal: number

    @Column
    swapused: number

    @Column
    swapfree: number

    @Column
    createdAt: Date

    @Column
    updatedAt: Date

    @BelongsTo(() => Server)
    server: Server
}