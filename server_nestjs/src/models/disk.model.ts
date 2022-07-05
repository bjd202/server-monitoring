import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Server } from './server.model'

@Table({
    tableName: 'disk',
    freezeTableName: true
})
export class Disk extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(() => Server)
    @Column
    hostname: string

    @Column
    fs: string

    @Column
    type: string

    @Column
    size: number

    @Column
    used: number

    @Column
    available: number

    @Column
    use: number

    @Column
    mount: string

    @Column
    createdAt: Date

    @Column
    updatedAt: Date

    @BelongsTo(() => Server)
    server: Server
}