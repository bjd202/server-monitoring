import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
    tableName: 'cpu',
    freezeTableName: true
})
export class Cpu extends Model{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    hostname: string

    @Column
    manufacturer: string

    @Column
    brand: string

    @Column
    vendor: string

    @Column
    cores: number

    @Column
    createdAt: Date

    @Column
    updatedAt: Date
}